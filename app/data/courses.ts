const SEMESTER_ORDER: Record<string, number> = {
  spring: 0,
  summer: 1,
  fall: 2,
};

// Turns a term like "Fall 2025" into a sortable number. Returns null if unreadable.
export function termValue(term?: string): number | null {
  if (!term) return null;
  const match = term.match(/(spring|summer|fall)\b.*?(\d{4})/i);
  if (!match) return null;
  return Number(match[2]) * 10 + SEMESTER_ORDER[match[1].toLowerCase()];
}

export type SortOption = {
  id: string;
  label: string;
  compare: (a: Course, b: Course) => number;
};

function byTerm(direction: 1 | -1) {
  return (a: Course, b: Course) => {
    const av = termValue(a.term);
    const bv = termValue(b.term);
    if (av === null && bv === null) return 0;
    if (av === null) return 1; // courses without a readable term always go last
    if (bv === null) return -1;
    return (av - bv) * direction;
  };
}

// Sort options here; a button appears for each one. To be expanded
export const SORT_OPTIONS: SortOption[] = [
  { id: "term-desc", label: "Newest first", compare: byTerm(-1) },
  { id: "term-asc", label: "Oldest first", compare: byTerm(1) },
];

export const DEFAULT_SORT_ID = "term-desc";
export type Course = {
  code: string;
  name: string;
  term?: string;       // e.g. "Fall 2025"
  tags?: string[];     // e.g. ["Python", "Data Structures"]
  summary: string;     // shown on the card (short)
  learned?: string;    // shown in the modal; no button appears if omitted
  featured?: boolean; // true = show in "Recent Coursework" on the home page

};

export const FEATURED_COURSES_MAX = 3;

// Be mindful of duplicate codes; they are used as keys in the CourseCard component
const courses: Course[] = [
  {
    code: "COP3502C & COP3503C",
    name: "Programming Fundementals 1 & 2",
    term: "Fall 2024 - Spring 2025",
    tags: ["Python", "C++"],
    summary: "Provided some foundational knowledge in programming. Class was taught in Python and C++.",
    learned:
      "Honed my programming skills and learned the fundamentals of programming. Learned how to write code in Python and C++ by working on various projects and assignments.",
  },
  {
    code: "COT3100",
    name: "Applied Discrete Structures",
    term: "Spring 2025",
    tags: ["Discrete Math", "Logic", "Proofs"],
    summary: "Introduction to discrete mathematics and logic.",
    learned: "Provided a solid foundation in discrete mathematics and logic, including the ability to construct and understand mathematical proofs.",
  },
  {
    code: "CDA3101",
    name: "Introduction to Computer Organization",
    term: "Summer 2025",
    tags: ["Computer Architecture", "Assembly Language"],
    summary: "Organization of computing systems, logical basis of computer structure, machine representation of instructions and data, flow of control, basic machine instructions, and assembly language programming.",
    learned: "Got to experience the inner workings of computer systems and how they are organized at a low level." + 
      " Provided an introduction to assembly language programming and the ability to write simple programs in assembly language.",
  },
  {
    code: "COP3530",
    name: "Data Structures and Algorithms",
    term: "Summer 2025",
    tags: ["Data Structures", "Algorithms", "C++"],
    summary: "Focuses on the design, implementation, and analysis of data structures and algorithms. Topics include arrays, linked lists, stacks, queues, trees, graphs, sorting and searching algorithms, and algorithmic complexity. ",
    learned: "Developed a strong foundation in data structures and algorithms, including the ability to design, implement, and analyze various data structures and algorithms. " +
      "The main project was a team-based assignment where we built an app that compared the effectiveness of different sorting algorithms on large datasets. of two distinct search algorithms. "+
      "Also served as an introduction to LeetCode, a platform for practicing coding problems and preparing for technical interviews. ",
  
  },
  {
    code: "CEN3031",
    name: "Introduction to Software Engineering",
    term: "Spring 2026",
    tags: ["Software Engineering", "Design", "Development"],
    summary: "Teaches the principles and practices of software engineering, including software design, development, and maintenance.",
    learned: "This class had a large emphasis on the large-scale development of software systems in a collaborative environment. "+ 
    "Here, I learned how to work effectively in a team, communicate with stakeholders, and manage the software development lifecycle, all of which were practiced through AGILE & SCRUM methodologies. "+
    "The main project was a team-based assignment where we built a web application using Agile methodologies.",
    featured: true,
  },
  {
    code: "MAS3114",
    name: "Computational Linear Algebra",
    term: "Spring 2026",
    tags: ["Linear Algebra", "Matrix Computations", "Numerical Methods"],
    summary: "Covers the algorithmic and mechanical aspects of linear algebra, including matrix computations, numerical methods, and applications in science and engineering.",
    learned: "Aside from the theoretical aspects of linear algebra, I also gained experience working with MatLab through emulation to solve various linear algebra problems.",
  },
  {
    code: "EEL3872",
    name: "AI Fundamentals",
    term: "Fall 2026",
    tags: ["Artificial Intelligence", "Machine Learning", "Neural Networks"],
    summary: "Provides a basic introduction to the field of artificial intelligence, including machine learning and neural networks.",
    learned: "I'm actively taking this class. Currently, I am training my own agent using sea turtle data in order for it to be applied to a real-world conservation challenge.",
    featured: true,
  },
  {
    code: "EGS4034",
    name: "Engineering Ethics and Professionalism",
    term: "Fall 2026",
    tags: ["Ethics", "Professionalism", "Engineering"],
    summary: "Teaches the ethical and professional responsibilities of engineers via analyzing real-world case studies and scenarios.",
    learned: "I am actively taking this class. An upcoming project involves analyzing an ethical dilemma in current day with no current resolution.",
  },
  {
    code: "COP4020",
    name: "Programming Languages Concepts",
    term: "Fall 2026",
    tags: ["Programming Languages", "Compilation", "Interpretation", "JavaScript", "Kotlin"],
    summary: "Bridges the gap between software development and theoretical computer science by teaching you how programming languages are designed, specified, analyzed, and implemented.",
    learned: "I am actively taking this class. I am currently working on developing the evaluator for the programming language we are designing in class using JavaScript. "+
    "This involves implementing the semantics of the language and ensuring that it behaves as expected.",
    featured: true,
  },

];

export default courses;
export const featuredCourses = courses
  .filter((course) => course.featured)
  .slice(0, FEATURED_COURSES_MAX);