// import { useState, useEffect } from "react";
// // import type { Course } from "../data/courses";
// import { t } from "./theme";

// export function CertificateCard({
  
// }: ) {
//   const [isOpen, setIsOpen] = useState(false);

//   // Lock background scroll and allow Escape to close while the modal is open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";

//     const onKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setIsOpen(false);
//     };
//     if (isOpen) window.addEventListener("keydown", onKeyDown);

//     return () => {
//       document.body.style.overflow = "unset";
//       window.removeEventListener("keydown", onKeyDown);
//     };
//   }, [isOpen]);

//   return (
//     <>
//       {/* --- CARD --- */}
//       <article
//         className={`flex flex-col justify-between rounded-2xl border ${t.border} ${t.surfaceMuted} p-5 shadow-sm`}
//       >
//         <div>
//           <div className="flex items-baseline justify-between gap-3">
//             <p className={`text-xs font-semibold ${t.textBrand}`}>{code}</p>
//             {term ? <p className={`text-xs ${t.textSubtle}`}>{term}</p> : null}
//           </div>

//           <h3 className={`mt-1 text-base font-semibold ${t.text}`}>{name}</h3>

//           <p className={`mt-2 text-sm leading-6 ${t.textMuted} line-clamp-3`}>
//             {summary}
//           </p>

//           {tags.length > 0 ? (
//             <div className="mt-3 flex flex-wrap gap-2">
//               {tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${t.chip}`}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           ) : null}
//         </div>

//         {learned ? (
//           <div className={`mt-5 border-t ${t.border} pt-4`}>
//             <button
//               onClick={() => setIsOpen(true)}
//               type="button"
//               className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${t.btnPrimary}`}
//             >
//               What I learned
//             </button>
//           </div>
//         ) : null}
//       </article>

//       {/* --- MODAL --- */}
//       {isOpen ? (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
//           <div
//             className={`fixed inset-0 ${t.backdrop} backdrop-blur-md transition-opacity`}
//             onClick={() => setIsOpen(false)}
//           />

//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-label={`${code} ${name}`}
//             className={`relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border ${t.border} ${t.surface} p-6 shadow-2xl sm:p-8`}
//           >
//             <div className={`flex items-start justify-between border-b ${t.border} pb-4`}>
//               <div>
//                 <p className={`text-xs font-semibold ${t.textBrand}`}>
//                   {code}
//                   {term ? <span className={t.textSubtle}> &nbsp;{term}</span> : null}
//                 </p>
//                 <h2 className={`mt-1 text-2xl font-bold ${t.text}`}>{name}</h2>
//                 {tags.length > 0 ? (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${t.chip}`}
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 ) : null}
//               </div>

//               <button
//                 onClick={() => setIsOpen(false)}
//                 type="button"
//                 className={`rounded-full p-2 ${t.iconBtn}`}
//                 aria-label="Close modal"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="mt-6 space-y-6">
//               <div>
//                 <h4 className={`text-xs font-semibold uppercase tracking-wider ${t.textSubtle}`}>
//                   Course Overview
//                 </h4>
//                 <p className={`mt-2 text-base leading-7 ${t.textMuted}`}>{summary}</p>
//               </div>

//               <div>
//                 <h4 className={`text-xs font-semibold uppercase tracking-wider ${t.textSubtle}`}>
//                   What I Learned
//                 </h4>
//                 <p className={`mt-2 text-base leading-7 ${t.textMuted} whitespace-pre-line`}>
//                   {learned}
//                 </p>
//               </div>
//             </div>

//             <div className={`mt-8 flex justify-end border-t ${t.border} pt-4`}>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 type="button"
//                 className={`text-xs font-medium ${t.textBtn}`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </>
//   );
// }