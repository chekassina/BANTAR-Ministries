import React, { useState } from 'react';
import { School, BookOpen, GraduationCap, ArrowRight, CheckCircle2, User, Phone, Mail, Award, Key, Download, FileText, AlertCircle } from 'lucide-react';
import { CrisomCourse } from '../types';
import { store } from '../firebase';
import ImageWithFallback from './ImageWithFallback';

interface CrisomProps {
  courses: CrisomCourse[];
}

export default function Crisom({ courses }: CrisomProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'courses' | 'apply' | 'portal'>('info');
  const [selectedCourse, setSelectedCourse] = useState<CrisomCourse | null>(null);

  // Application form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseChoice, setCourseChoice] = useState(courses[0]?.title || 'Foundations of Spiritual Excellence');
  const [essay, setEssay] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  // Student Portal states
  const [studentId, setStudentId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await store.addDocument('crisom_applications', {
        name,
        email,
        phone,
        selectedCourse: courseChoice,
        essay,
        date: new Date().toISOString(),
        status: 'pending'
      });

      setSubmitting(false);
      setApplied(true);
      setName('');
      setEmail('');
      setPhone('');
      setEssay('');
    } catch (error) {
      console.error("Error applying to CRISOM:", error);
      setSubmitting(false);
    }
  };

  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim().toUpperCase() === 'CRISOM-2026' || studentId.trim() === 'student') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Student Registration ID. Try using code "CRISOM-2026" to login.');
    }
  };

  return (
    <div id="crisom-school-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic background lighting */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* CRISOM Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 shadow-sm">
            <School className="w-8 h-8 text-brand-green animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
            Christ's Revelation School of Ministry
          </h2>
          <span className="inline-block text-[10px] font-bold text-brand-green tracking-widest uppercase bg-brand-green/10 px-4 py-1.5 rounded-full border border-brand-green/20">
            CRISOM Discipleship Department
          </span>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Raising a generation of men and women who carry an unusual passion for God, with undivided focus on His purpose in the earth.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2 flex flex-wrap gap-1 md:gap-2 justify-center shadow-xs">
          {([
            { id: 'info', label: 'School Mandate', icon: Award },
            { id: 'courses', label: 'Available Courses', icon: BookOpen },
            { id: 'apply', label: 'Online Application', icon: GraduationCap },
            { id: 'portal', label: 'Active Student Portal', icon: Key },
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`crisom-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id !== 'apply') setApplied(false);
                }}
                className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 flex-1 text-center cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-green text-white shadow-md'
                    : 'bg-transparent text-slate-500 border border-transparent hover:text-brand-green hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content 1: Backstory & Mandate */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full w-fit block">The Foundational Vocation</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                "No one who passes through your hands shall be the same."
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                May the peace of the Lord be with you, beloved in Christ Jesus. You are welcome to <strong className="text-slate-900">Christ's Revelation School of Ministry (CRISOM)</strong>. We are the discipleship department of Christ's Revelation International Church.
              </p>

              <div className="p-5 rounded-2xl bg-brand-green/10 border border-brand-green/20 border-l-4 border-l-brand-green text-xs text-slate-700 italic leading-relaxed">
                "It was back in 2013 when Apostle Godwin BANTAR was alone with the Lord in the wilderness seeking his face to get his mind about his generation. In an encounter, God handed him this vocation and many other things still about his generation. His journey has since focused on empowering souls to fulfill their divine purpose."
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Objectives of CRISOM:</h4>
                <ul className="space-y-2 text-xs text-slate-650">
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-green font-bold mt-0.5">•</span>
                    <span>To raise an apostolic generation with an unusual hunger and passion for God.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-green font-bold mt-0.5">•</span>
                    <span>To equip business leaders, pastors, and missionaries with spiritual excellence and practical tools.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-green font-bold mt-0.5">•</span>
                    <span>To implement community development planning to serve suffering populations.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden relative shadow-sm">
                <ImageWithFallback 
                  src="/images/lat1(32).jpg" 
                  alt="CRISOM classroom" 
                  className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold text-brand-green animate-pulse">ESTABLISHED 2013</span>
                  <p className="text-white font-bold text-sm mt-1">Nurturing Divine Purposes</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Available Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-brand-green/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                      <span>{course.code}</span>
                      <span className="text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">{course.duration}</span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 leading-tight">{course.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{course.description}</p>
                  </div>

                  <button
                    id={`view-course-details-${course.id}`}
                    onClick={() => setSelectedCourse(course)}
                    className="mt-6 w-full py-3 bg-white border border-slate-200 hover:bg-brand-green hover:text-white text-xs font-bold text-brand-green uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    View Curriculum
                  </button>
                </div>
              ))}
            </div>

            {/* Course Curriculum Drawer/Modal */}
            {selectedCourse && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full max-h-[80vh] overflow-hidden flex flex-col shadow-xl text-slate-800 animate-fadeIn">
                  <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div>
                      <span className="text-[9px] font-bold text-brand-green bg-brand-green/10 px-2.5 py-1 rounded-full font-mono">{selectedCourse.code}</span>
                      <h3 className="text-lg font-black text-slate-900 mt-2">{selectedCourse.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedCourse(null)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs text-slate-700 font-bold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto space-y-6">
                    <div className="space-y-1.5 text-xs">
                      <p className="text-slate-500 uppercase font-bold">Course Instructor</p>
                      <p className="text-slate-900 font-bold text-sm">{selectedCourse.instructor}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 uppercase font-bold">Weekly Syllabus Outlines</p>
                      <div className="space-y-2.5">
                        {selectedCourse.syllabus.map((week, idx) => (
                          <div key={idx} className="flex gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                            <span className="font-bold text-brand-green font-mono">Week 0{idx+1}:</span>
                            <span className="text-slate-800 font-medium">{week}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab content 3: Application Form */}
        {activeTab === 'apply' && (
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            {!applied ? (
              <form onSubmit={handleApplySubmit} className="space-y-6">
                <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-brand-green" />
                  <span>Online Admission Application</span>
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+237 ••• ••• •••"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none font-mono shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected Course</label>
                      <select
                        id="crisom-course-select"
                        value={courseChoice}
                        onChange={(e) => setCourseChoice(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green cursor-pointer shadow-xs"
                      >
                        {courses.map(c => (
                          <option key={c.id} value={c.title} className="bg-white text-slate-900">{c.title} ({c.code})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Brief Testimony / Salvation Backstory</label>
                    <textarea
                      required
                      rows={4}
                      value={essay}
                      onChange={(e) => setEssay(e.target.value)}
                      placeholder="Share a brief essay detailing your spiritual hunger and why you want to enroll in CRISOM..."
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed shadow-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Submit Application</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-6 text-slate-800">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 uppercase leading-none">Applied successfully!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying. The CRISOM discipleship committee will review your application essay. Your matriculation log will be sent via email.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-xl text-left max-w-sm mx-auto space-y-2 text-xs font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Course</span>
                    <span className="text-slate-900 font-bold text-right line-clamp-1">{courseChoice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Portal Code Key</span>
                    <span className="text-brand-green font-bold">CRISOM-2026</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('portal')}
                  className="bg-brand-green text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-xl hover:bg-brand-green-dark transition-all cursor-pointer"
                >
                  Access Student Portal
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab content 4: Student Portal */}
        {activeTab === 'portal' && (
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-slate-800">
            {!isLoggedIn ? (
              <form onSubmit={handlePortalLogin} className="max-w-sm mx-auto space-y-6 text-center py-6">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto border border-brand-green/20">
                  <Key className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider leading-none">Access CRISOM Portal</h3>
                  <p className="text-xs text-slate-600 leading-normal">
                    Enter your Student ID to access download handouts, syllabus readings, and recorded apostolic lessons.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-600 text-xs rounded-xl flex items-start gap-2 text-left leading-normal">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Student ID</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter Student ID (Use code: CRISOM-2026)"
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md cursor-pointer hover:bg-brand-green-dark"
                >
                  Log In to Student Space
                </button>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Logged in student panel header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-green/25 text-brand-green flex items-center justify-center font-bold font-mono shadow-xs border border-brand-green/20">
                      ST
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Active Student Dashboard</p>
                      <p className="text-xs text-slate-500 font-mono">Reg ID: CRISOM-2026</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsLoggedIn(false);
                      setStudentId('');
                    }}
                    className="text-xs font-bold text-red-500 uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>

                {/* Course files download space */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Registered Course Material</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center hover:border-brand-green/35 transition-all">
                      <div className="flex gap-3">
                        <BookOpen className="w-8 h-8 text-brand-green shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Foundations Course Syllabus Handout (PDF)</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Size: 4.2 MB • Required Reading</p>
                        </div>
                      </div>
                      <a href="#" className="p-2 rounded-xl bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center hover:border-brand-green/35 transition-all">
                      <div className="flex gap-3">
                        <FileText className="w-8 h-8 text-brand-green shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Wilderness Walk Preparations Audio Lecture</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Format: MP3 • Apostle Godwin Bantar</p>
                        </div>
                      </div>
                      <a href="#" className="p-2 rounded-xl bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all">
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Virtual lectures */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Interactive Lectures Calendar</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">Vocation Revelations & Apostolic Operations (CRS 201)</p>
                        <p className="text-[10px] text-slate-500 mt-1">Instructor: Apostle Godwin BANTAR</p>
                      </div>
                      <span className="text-[9px] font-bold text-brand-green uppercase bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full shrink-0">
                        Friday 6:00 PM
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900">Active Philanthropy & NGO Project Planning (CRS 301)</p>
                        <p className="text-[10px] text-slate-500 mt-1">Instructor: Pastor Mrs Ethel Bantar</p>
                      </div>
                      <span className="text-[9px] font-bold text-brand-green uppercase bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full shrink-0">
                        Tuesday 4:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
