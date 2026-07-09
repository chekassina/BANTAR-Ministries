import { Sermon, Event, Product, BlogPost, CrisomCourse } from './types';

export const defaultSermons: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'The Wilderness Encounter: Vision 2013',
    speaker: 'Apostle Godwin BANTAR',
    date: '2026-06-28',
    type: 'written',
    url: '',
    thumbnail: '/images/lat1(1).jpg',
    category: 'Apostolic Mandate',
    description: 'Relive the encounter in the wilderness back in 2013 where God handed over this vocation and assured His servant: "No one who passes through your hands shall be the same."',
    duration: '15 min read'
  },
  {
    id: 'sermon-2',
    title: 'The Power of Spiritual Excellence',
    speaker: 'Apostle Godwin BANTAR',
    date: '2026-07-05',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Mock public video file
    thumbnail: '/images/lat1(2).jpg',
    category: 'Spiritual Growth',
    description: 'Discover how seeking spiritual excellence equips the believer to lead with passion and fulfill divine purpose.',
    duration: '45:12'
  },
  {
    id: 'sermon-3',
    title: 'Igniting the Fire of Global Revival',
    speaker: 'Apostle Godwin BANTAR',
    date: '2026-06-15',
    type: 'audio',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Mock public audio file
    thumbnail: '/images/lat1(3).jpg',
    category: 'Revival',
    description: 'An apostolic message on global revival and community development activities in Cameroon.',
    duration: '32:40'
  },
  {
    id: 'sermon-4',
    title: 'Ministering to the Less Privileged',
    speaker: 'Pastor Mrs Ethel Bantar',
    date: '2026-05-20',
    type: 'written',
    url: '',
    thumbnail: '/images/lat1(4).jpg',
    category: 'Compassion & Charity',
    description: 'Understanding our mandate for compassion. True church impact is measured by how we assist those suffering in the church and our community.',
    duration: '10 min read'
  }
];

export const defaultEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Global Revival Conference 2026',
    date: '2026-08-15',
    time: '17:00',
    location: 'CRIC Yaoundé HQ, Cameroon',
    description: 'An apostolic gathering focusing on spiritual excellence, global revival, and community development. Host: Apostle Godwin BANTAR & Pastor Mrs Ethel Bantar.',
    category: 'conference',
    imageUrl: '/images/lat1(5).jpg',
    registrantsCount: 245
  },
  {
    id: 'event-2',
    title: 'Nkambe Miracle Crusade',
    date: '2026-09-22',
    time: '15:00',
    location: 'Nkambe Town Green, North West Region, Cameroon',
    description: 'Returning to the roots of the Apostle Godwin BANTAR in the locality of Nkambe, Donga Mantung for a massive spiritual revival and local empowerment crusade.',
    category: 'crusade',
    imageUrl: '/images/lat1(6).jpg',
    registrantsCount: 512
  },
  {
    id: 'event-3',
    title: 'CRISOM Enrollment Seminar',
    date: '2026-07-28',
    time: '18:00',
    location: 'Online Webinar Portal',
    description: 'Information session for candidates wishing to enroll in the Christ\'s Revelation School of Ministry (CRISOM) for the upcoming semester.',
    category: 'special',
    imageUrl: '/images/lat1(7).jpg',
    registrantsCount: 98
  },
  {
    id: 'event-4',
    title: 'Sunday Transformation Service',
    date: 'Every Sunday',
    time: '08:00',
    location: 'Yaoundé Head Quarter (HQ), Cameroun',
    description: 'Join us weekly for worship, word, and apostolic demonstration under the leadership of Apostle Godwin BANTAR.',
    category: 'weekly',
    imageUrl: '/images/lat1(8).jpg',
    registrantsCount: 1200
  }
];

export const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Unlocking Your Divine Purpose',
    price: 5000,
    description: 'The bestselling guide on aligning with God\'s seasons and walking in spiritual excellence. Authored by Apostle Godwin BANTAR.',
    type: 'book',
    imageUrl: '/images/lat1(9).jpg'
  },
  {
    id: 'prod-2',
    name: 'Spiritual Excellence and Global Revival',
    price: 3500,
    description: 'Audio teaching compilation of Apostolic declarations and lectures from Apostle Godwin BANTAR.',
    type: 'teaching',
    imageUrl: '/images/lat1(10).jpg',
    downloadUrl: '#'
  },
  {
    id: 'prod-3',
    name: 'CRIC Branded Polo T-Shirt',
    price: 7500,
    description: 'High-quality fabric polo shirts featuring Bantar Ministries and CRIC emblem. Available in Black, White, and Blue.',
    type: 'merch',
    imageUrl: '/images/lat1(11).jpg'
  },
  {
    id: 'prod-4',
    name: 'CRISOM Ministerial Handout (PDF)',
    price: 2500,
    description: 'Essential workbook and discipleship reading manual for all Christ\'s Revelation School of Ministry students.',
    type: 'digital',
    imageUrl: '/images/lat1(12).jpg',
    downloadUrl: '#'
  }
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Wilderness Encounter: A Vocation Revealed',
    author: 'Apostle Godwin BANTAR',
    date: '2026-07-01',
    category: 'devotional',
    imageUrl: '/images/lat1(13).jpg',
    excerpt: 'In 2013, seeking God in the wilderness, an unusual passion was ignited. This encounter gave birth to a generation of impact.',
    content: `May the peace of the Lord be with you, beloved in Christ Jesus.

It was back in 2013 when I was alone with the Lord in the wilderness seeking his face to get his mind about his generation. In an encounter, God handed me this vocation and many other things which may be personal, still about his generation. 

God gave this mandate and assured me in his own word: "No one who passes through your hands shall be the same."

My journey has since focused on empowering souls to fulfill their divine purpose. This ministry is built on three pillars: Global Revival, Spiritual Excellence, and Community Development.`
  },
  {
    id: 'blog-2',
    title: 'The Heart of Compassion: Reaching Out',
    author: 'Pastor Mrs Ethel Bantar',
    date: '2026-06-20',
    category: 'article',
    imageUrl: '/images/lat1(14).jpg',
    excerpt: 'True spiritual leadership is manifested in our care for the less privileged. Discover our mission to empower Yaoundé and Nkambe.',
    content: `Our Christian movement, Christ's Revelation International Church, was born from a spirit of revival and deep compassion.

Apostle Godwin Bantar and I have repeatedly prioritised human empowerment activities to assist those suffering in the church and in our larger community. This is not just corporate social responsibility; it is the very gospel of Jesus Christ in action.

Through food distribution, scholarship provisions for Donga Mantung youth, and startup support for small businesses, we are raising a generation that excels both spiritually and economically.`
  },
  {
    id: 'blog-3',
    title: 'Welcome to CRISOM: Raising Disciples',
    author: 'CRISOM Discipleship Department',
    date: '2026-06-10',
    category: 'announcement',
    imageUrl: '/images/lat1(15).jpg',
    excerpt: 'CHRIST\'S REVELATION SCHOOL OF MINISTRY (CRISOM) is officially enrolling for our discipleship program.',
    content: `Welcome to Christ's Revelation School of Ministry (CRISOM).

We are the Discipleship department of Christ's Revelation Int'l Church. The objective of this school of ministry is to raise a generation of men and women who carry an unusual passion for God, people with undivided focus on God and for his purpose in the earth. 

Join us as we equip you with theological depths and spiritual power to stand as a light in your generation.`
  }
];

export const defaultCourses: CrisomCourse[] = [
  {
    id: 'course-1',
    title: 'Foundations of Spiritual Excellence',
    code: 'CRS 101',
    instructor: 'Apostle Godwin BANTAR',
    duration: '12 Weeks',
    description: 'Establishing a solid foundation in Christian doctrine, spiritual disciplines, and character alignment to walk in divine purpose.',
    syllabus: [
      'Understanding the New Birth and Eternal Life',
      'The Power of the Holy Spirit and Faith',
      'The Wilderness Walk: Navigating Seasons of Preparation',
      'Character and Integrity in Spiritual Ministry'
    ],
    materials: ['Syllabus Booklet PDF', 'Audio lectures collection']
  },
  {
    id: 'course-2',
    title: 'The Apostolic Mandate & Revival History',
    code: 'CRS 201',
    instructor: 'Apostle Godwin BANTAR',
    duration: '10 Weeks',
    description: 'An advanced study on the prophetic and apostolic move of God, focusing on global revival paradigms and spiritual leadership.',
    syllabus: [
      'Introduction to Apostolic Office and Voice',
      'Historical Waves of Revival in Africa',
      'Activating the Vision 2013 Vocation',
      'The Anointing, Grace, and Kingdom Realignment'
    ],
    materials: ['Mandate Guide PDF', 'Apostolic Audio Library']
  },
  {
    id: 'course-3',
    title: 'Community Empowerment & Kingdom Business',
    code: 'CRS 301',
    instructor: 'Pastor Mrs Ethel Bantar',
    duration: '8 Weeks',
    description: 'Practical training on bridging spiritual excellence with tangible community development and compassionate entrepreneurship.',
    syllabus: [
      'The Theology of Compassion and Less Privileged Care',
      'Entrepreneurship as a Tool for Kingdom Advance',
      'Project Management for Church Outreach',
      'Resource Mobilization and NGO Planning'
    ],
    materials: ['Kingdom Business Handbook', 'Outreach planning guide']
  }
];
