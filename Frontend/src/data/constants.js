/**
 * @file constants.js
 * @description
 * Contains static data and configuration constants for the Chips & Bytes website.
 * Includes blog links, project links, mentors, events, and members data.
 * 
 * Exports:
 * - blogLinks: Array of blog URLs.
 * - gitLinks: Array of GitHub project objects.
 * - mentors: Array of mentor profile objects.
 * - events: Array of event objects.
 * - members: Array of club member profile objects.
 */

// List of featured blog URLs for the Blogs section and carousel
export const blogLinks = [
  "https://medium.com/@saratgandholi/tracing-code-execution-unlocking-software-insight-without-exposing-code-c2d2f2b84ab6",
  "https://medium.com/@panugantichiragsai12/memory-around-us-why-your-laptop-phone-and-playstation-dont-speak-the-same-927b4cb86850",
  "https://medium.com/@ssaketh.2002/cuda-chronicles-motivation-de3b68368598",
  "https://medium.com/@panugantichiragsai12/memory-around-us-ddr-part-1-019408f92098",
  "https://medium.com/@saratgandholi/unlocking-the-binary-a-dive-into-dynamic-binary-instrumentation-with-dynamorio-8a003b95e836",
  "https://medium.com/@panugantichiragsai12/memory-around-us-ddr-part-2-5d6aa6291d1d",
  "https://medium.com/@saratgandholi/unlocking-the-binary-part-2-practical-dynamorio-instrumentation-in-action-09cfa0968f95",
  "https://medium.com/@saratgandholi/cache-memory-explained-l1-l2-l3-and-why-they-matter-for-performance-49403bb50b1b",
  "https://medium.com/@panugantichiragsai12/memory-around-us-ddr-part-3-1d8166841103",
  "https://medium.com/@saratgandholi/the-easy-way-to-understand-gpu-vs-cpu-364de2d608ad",
  "https://medium.com/@panugantichiragsai12/memory-around-us-lpddr-part-1-e0159687992b",
  "https://medium.com/@saratgandholi/how-a-cpu-really-works-from-fetch-to-execute-6640808e06eb",
  "https://medium.com/@panugantichiragsai12/memory-around-us-lpddr-part-2-8b047ea84499",
  "https://medium.com/@saratgandholi/tracing-code-execution-part-2-from-theory-to-real-world-impact-7e7c3a8bafaa",
  "https://medium.com/@ssaketh.2002/cuda-chronicles-programming-model-2-3025daa389bc",
  "https://medium.com/@saratgandholi/why-your-computer-is-basically-a-lazy-teenager-c7e805830b83",
  "https://medium.com/@panugantichiragsai12/memory-around-us-lpddr-part-3-0f479b00fb17",
  "https://medium.com/@saratgandholi/multithreading-why-your-computer-is-basically-a-group-project-3764e3065c1f",
  "https://medium.com/@ssaketh.2002/cuda-chronicles-programming-interface-3-part-1-021dec1d231c",
  "https://medium.com/@panugantichiragsai12/memory-around-us-gddr-part-1-5e80fa462991",
  "https://medium.com/@panugantichiragsai12/memory-around-us-gddr-part-2-b714e9a7fce1",
  "https://medium.com/@panugantichiragsai12/memory-around-us-gddr-part-3-9f3ca7cfc9fa",
];

// List of featured GitHub project links for the Projects section and carousel
export const gitLinks = [
  {
    url: "https://github.com/GandholiSarat/DynamoRIO-Custom-Client",
    title: "DynamoRIO Custom Client",
    description: "A custom instrumentation client for observing and analysing program behaviour at runtime.",
  },
  {
    url: "https://github.com/Chirag-Sai-Panuganti/ReLMXEL",
    title: "ReLMXEL",
    description: "Research-driven experiments at the intersection of machine learning systems and efficient computing.",
  },
  {
    url: "https://github.com/GandholiSarat/kv-cache-visualizer",
    title: "KV Cache Visualizer",
    description: "An interactive way to understand the key-value cache used by modern language models.",
  },
];

// Array of mentor profiles for the Mentors section
export const mentors = [
  {
    name: 'Dr. R. Raghunatha Sarma',
    designation: 'Associate Professor at SSSIHL',
    summary: 'Specializes in Computer Architecture and Operating Systems, with over several years of teaching experience.',
    image: '/images/Raghu_sir.jpg',
    linkedin: 'https://in.linkedin.com/in/dr-raghunatha-sarma-r-81016712',
  },
  {
    name: 'Dr. Srinath M. S',
    designation: 'Associate Professor at SSSIHL',
    summary: 'Expert in Mathematics and Cryptography',
    image: '/images/Srinath.jpg',
    linkedin: 'https://www.linkedin.com/in/m-s-srinath-6697b812/',
  },
  {
    name: 'Dr. Sai Shyam Sharma',
    designation: 'Associate Professor at SSSIHL',
    summary: 'Specialist in Operating Systems, Cyber Security, Computer Vision and Networks',
    image: '/images/Shyam.jpeg',
    linkedin: 'https://www.linkedin.com/in/sai-shyam-sharma-31004a16/',
  },
  {
    name: 'Mr. M. Naveen',
    designation: 'RedHat',
    summary: 'Specializes in Computer Architecture and Senior Member Of Technical Staff at AMD',
    image: '/images/Naveen.jpeg',
    linkedin: 'https://www.linkedin.com/in/naveenmiriyalu/'
  },
  {
    name: 'Mr. Dibyam Pradhan',
    designation: 'Principal CPU Architect at ARM',
    summary: 'Expert in CPU Design and GPU Architecture',
    image: '/images/Dibyam.jpeg',
    linkedin: 'https://www.linkedin.com/in/dibyam-pradhan-24b39720/'
  },
  {
    name: 'Mr. Manoj Dusanapudi',
    designation: 'Distinguished Engineer at IBM',
    summary: 'Multicore System Design Expert',
    image: '/images/Manoj.jpeg',
    linkedin: 'https://www.linkedin.com/in/manojdusanapudi/'
  },
  {
    name: 'Mr. Saketh Ram Chakilam',
    designation: 'Senior Staff Verification Engineer at SiFive',
    summary: 'Cache design and Analysis Expert',
    image: '/images/Saketh.jpeg',
    linkedin: 'https://www.linkedin.com/in/csakethram/'
  },
  {
    name: 'Mr. K. V. K. Vamshi Krishna',
    designation: 'System Software Engineer at NVIDIA',
    summary: 'Specializes in GPU architecture, Development and Analysis.',
    image: '/images/Vamshi.jpeg',
    linkedin: 'https://www.linkedin.com/in/vamshi-krishna-a1109516/'
  },
  {
    name: 'Mr. Aravind. S. V',
    designation: 'Graduate CPU Architect at ARM',
    summary: 'CPU Design and Performance Analysis Expert',
    image: '/images/Aravind.jpeg',
  },
  {
    name: 'Mr. Mangala Prasad Sahu',
    designation: 'Hardware Developer at IBM',
    summary: 'Specializes in Hardware Design and Performance Analysis',
    image: '/images/Mangala.jpeg',
  },
];

// Array of event objects for the Events section
export const events = [
  {
    id: 1,
    date: "2025-07-26",
    title: "“The PC Builder Challenge” – System Fundamentals and PC Building Workshop",
    reportLink: "https://drive.google.com/file/d/14rrIuCom7amLkbolOILVtzG1hFJlhPW1/view?usp=drive_link",
    resourcesLink: "https://drive.google.com/drive/folders/1WQaSN3Oi6kHMR5ogUtprUuxLQ7t8Nl9g?usp=drive_link"
  },
  {
    id: 2,
    date: "2025-08-02",
    title: "Visit to SAI HiPC",
    reportLink: "https://drive.google.com/file/d/1K4NeZU8Cbdr_WuKwkZFmZntq9E61Bco_/view?usp=drive_link",
    resourcesLink: "https://drive.google.com/drive/folders/10T8PJSt8KK2FokBF2OmTI2jjjrPXRCVA?usp=drive_link"
  }
];

// Array of club member profiles for the Members section
export const members = [
  {
    name: 'Gandholi Sarat',
    designation: 'I M.Tech CS at SSSIHL',
    summary: 'President of the Club',
    image: '/images/Sarat.png',
    linkedin: 'https://www.linkedin.com/in/gandholi-sarat/',
  },
  {
    name: 'Panuganti Chirag Sai',
    designation: 'I M.Tech CS at SSSIHL',
    summary: 'Vice-President of the Club',
    image: '/images/Chirag.png',
    linkedin: 'https://www.linkedin.com/in/panuganti-chirag-sai/'
  },
  {
    name: 'K Sharat',
    designation: 'I M.Tech CS at SSSIHL',
    summary: 'Secretary of the Club',
    image: '/images/Sharat.png',
    linkedin: 'https://www.linkedin.com/in/k-sharat/'
  },
  {
    name: 'Vishwanath Saikiran Shetiya',
    designation: 'Research Scholar at SSSIHL',
    summary: 'Public Realations Coordinator of the Club',
    image: '/images/Vishwa.png',
    linkedin: 'https://www.linkedin.com/in/vishwanath-shetiya-376a571a5/'
  },
  {
    name: 'Satya Balaji Animireddy',
    designation: 'I M.Tech CS at SSSIHL',
    summary: 'Website Coordinator of the Club',
    image: '/images/Balaji.png',
    linkedin: 'https://www.linkedin.com/in/satya-balaji-animireddy/'
  },

  {
    name: 'Abhinay Kumar',
    designation: 'I M.Tech CS at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/ABHINAY.jpg',
    linkedin: 'https://www.linkedin.com/in/abhinay-kumar-chauhan/'
  },
  
  {
    name: 'Cherukuri Sai Saketh',
    designation: 'II M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Sasa.png',
    linkedin: 'https://www.linkedin.com/in/sai-saketh-cherukuri-825456250/'
  },
  {
    name: 'Prabin Kumar Sabat',
    designation: 'II M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Prabin.png',
    linkedin: "https://www.linkedin.com/in/prabin-kumar-sabat/"
  },
  {
    name: 'Lokesh R',
    designation: 'II M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Lokesh.png',
    linkedin: 'https://www.linkedin.com/in/lokesh-r-4b8a1b1b/'
  },
  {
    name: 'Sai Aswin',
    designation: 'I M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Aswin.png',
    linkedin: 'https://www.linkedin.com/in/sai-aswin-5bb211251/'
  },
  {
    name: 'Prashant Poudyal',
    designation: 'I M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Prashanth.png',
    linkedin: 'https://www.linkedin.com/in/prashant-poudyal-a02230325/'
  },
  {
    name: 'Narasimha Murthy',
    designation: 'I M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Murthy.png',
    // linkedin: 'https://www.linkedin.com/in/narasimha-murthy-123456789/'
  },
  {
    name: 'Sai Krishna',
    designation: 'I M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Krishna.png',
    linkedin: 'https://www.linkedin.com/in/saikrishna-kusumanchi-540442379/'
  },
  {
    name: 'Subhasish Charan Behera',
    designation: 'I M.Sc Mathematics at SSSIHL',
    summary: 'Member of the Club',
    image: '/images/Subhashish.png',
    linkedin: 'https://www.linkedin.com/in/subhasish-charan-behera-a43b6b254/'
  },


  
];
