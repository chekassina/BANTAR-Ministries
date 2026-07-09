import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import SermonCentre from './components/SermonCentre';
import Store from './components/Store';
import Events from './components/Events';
import Giving from './components/Giving';
import PrayerTestimony from './components/PrayerTestimony';
import Crisom from './components/Crisom';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';

import { 
  defaultSermons, 
  defaultEvents, 
  defaultProducts, 
  defaultBlogPosts, 
  defaultCourses 
} from './data';
import { Sermon, Event, Product, BlogPost, CrisomCourse } from './types';
import { store } from './firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);

  // Core Data Collections
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [courses, setCourses] = useState<CrisomCourse[]>([]);

  // On boot, sync collections with Firestore / LocalStorage
  const syncCollections = async () => {
    // Preseed default items if they do not exist
    store.preseedIfEmpty('sermons', defaultSermons);
    store.preseedIfEmpty('events', defaultEvents);
    store.preseedIfEmpty('products', defaultProducts);
    store.preseedIfEmpty('blog_posts', defaultBlogPosts);
    store.preseedIfEmpty('courses', defaultCourses);

    // Retrieve active synced data from databases
    try {
      const syncedSermons = await store.getCollection('sermons');
      const syncedEvents = await store.getCollection('events');
      const syncedProducts = await store.getCollection('products');
      const syncedPosts = await store.getCollection('blog_posts');
      const syncedCourses = await store.getCollection('courses');

      setSermons(syncedSermons as Sermon[]);
      setEvents(syncedEvents as Event[]);
      setProducts(syncedProducts as Product[]);
      setPosts(syncedPosts as BlogPost[]);
      setCourses(syncedCourses as CrisomCourse[]);
    } catch (e) {
      console.warn("Syncing databases failed, using memory fallback state", e);
      setSermons(defaultSermons);
      setEvents(defaultEvents);
      setProducts(defaultProducts);
      setPosts(defaultBlogPosts);
      setCourses(defaultCourses);
    }
  };

  useEffect(() => {
    syncCollections();
  }, []);

  // Robust URL check for admin paths/hashes/searches
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;
      
      const decodedPath = decodeURIComponent(path).toLowerCase();
      const decodedHash = decodeURIComponent(hash).toLowerCase();
      const decodedSearch = decodeURIComponent(search).toLowerCase();

      // Check if URL pathname or hash or search contains 'admin' or has backslash/forward-slash variations
      const hasAdminInPath = decodedPath === '/admin' || 
                             decodedPath.endsWith('/admin') || 
                             decodedPath.includes('\\admin') || 
                             decodedPath.includes('/\\admin') ||
                             decodedPath.includes('\\\\admin');

      const hasAdminInHash = decodedHash.includes('admin') || 
                             decodedHash.includes('\\admin') ||
                             decodedHash === '#admin' ||
                             decodedHash === '#/admin';

      const hasAdminInSearch = decodedSearch.includes('admin');

      if (hasAdminInPath || hasAdminInHash || hasAdminInSearch) {
        setIsAdminUnlocked(true);
        setShowAdmin(true);
      }
    };

    checkAdminRoute();

    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const handleRegisterEvent = async (eventId: string) => {
    // Find the event and increment registrants count
    const updatedEvents = events.map(ev => {
      if (ev.id === eventId) {
        const currentCount = ev.registrantsCount || 0;
        const newCount = currentCount + 1;
        // Async update doc in store
        store.updateDocument('events', eventId, { registrantsCount: newCount });
        return { ...ev, registrantsCount: newCount };
      }
      return ev;
    });
    setEvents(updatedEvents);
  };

  return (
    <div id="application-container" className="min-h-screen flex flex-col justify-between bg-white font-sans">
      {/* Universal Sticky Responsive Navbar */}
      <Navigation 
        currentTab={showAdmin ? 'admin' : currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setShowAdmin(false);
        }} 
        onAdminClick={() => setShowAdmin(true)}
        isAdminUnlocked={isAdminUnlocked}
      />

      {/* Main Page Layout Router Container */}
      <main className="flex-1">
        {showAdmin ? (
          <AdminDashboard 
            onAddSermon={(newSermon) => setSermons([newSermon, ...sermons])}
            onAddProduct={(newProduct) => setProducts([newProduct, ...products])}
            onAddEvent={(newEvent) => setEvents([newEvent, ...events])}
            onAddPost={(newPost) => setPosts([newPost, ...posts])}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <Home 
                setCurrentTab={setCurrentTab} 
                events={events} 
                posts={posts} 
              />
            )}
            {currentTab === 'about' && <About />}
            {currentTab === 'sermons' && <SermonCentre sermons={sermons} />}
            {currentTab === 'store' && <Store products={products} />}
            {currentTab === 'programs' && (
              <Events 
                events={events} 
                onRegister={handleRegisterEvent} 
              />
            )}
            {currentTab === 'school' && <Crisom courses={courses} />}
            {currentTab === 'giving' && <Giving />}
            {currentTab === 'prayer' && <PrayerTestimony />}
            {currentTab === 'blog' && <Blog posts={posts} />}
            {currentTab === 'contact' && <Contact />}
          </>
        )}
      </main>

      {/* Universal Footer */}
      <Footer 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setShowAdmin(false);
        }} 
        onAdminClick={() => setShowAdmin(true)}
        isAdminUnlocked={isAdminUnlocked}
      />
    </div>
  );
}
