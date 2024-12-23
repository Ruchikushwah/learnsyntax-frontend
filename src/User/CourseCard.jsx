
import { NavLink } from "react-router-dom";

const CourseCard = ({ courses = [] }) => {
  console.log("data what we getting" + courses);
  return (

    <div id="course" className="md:px-14 max-w-screen-2xl mx-auto">
    {/* Header Section */}
    <div className="mt-20 md:w-1/2 mx-auto text-center">
        <h2 className="text-4xl tracking-tight font-extrabold text-neutralDGrey mb-2">Popular <span className='text-brandPrimary'>Courses</span></h2>
        <p className="text-neutralGrey">LearnSyntax will enhance your learning experience the way you interact.</p>
    </div>

    {/* Courses Section */}
    <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:w-11/12 mx-auto gap-12">
        {courses.length > 0 ? (
            courses.map((course) => (
              <NavLink
               to={`/singleviewpage/${course.id}/${course.course_slug}`}
              key={course.id}
              className="p-5 shadow rounded cursor-pointer hover:shadow-lg"
            >
                <div
                    key={course.id}
                    className="px-4 py-8 text-center md:w-[300px] mx-auto md:h-80 rounded-md shadow cursor-pointer 
                    hover:-translate-y-5 hover:border-b-4 hover:border-brandPrimary transition-all duration-300 flex items-center justify-center h-full"
                >
                    <div>
                        <div className="bg-[#E8F5E9] mb-4 h-14 w-14 mx-auto rounded-tl-3xl rounded-br-3xl">
                          {/* note below we have to give the image from db like course.image in src */}
                            <img src='/iconreact.png' alt={course.title} className="-ml-5" />
                        </div>
                        <h4 className="text-2xl font-bold text-neutralDGrey mb-2 px-2">{course.title}</h4>
                        <p className="text-sm text-neutralGrey">{course.description}</p>
                    </div>
                </div>
                </NavLink>
            ))
        ) : (
            <p className="col-span-full text-center text-white bg-slate-500 py-4 text-2xl">
                No Courses Available.
            </p>
        )}
    </div>
</div>


  );
};

export default CourseCard;


//   image,
//   Button,
//   CardDescription,
//   CardTitle,
//   titleHref,
//   btnHref,
// }) => {
//   return (
//     <>
//       {/*  */}
//       <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
//         <img src={image} alt="" className="w-full" />
//         <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
//           <h3>
//             <a
//               href={titleHref ? titleHref : "/#"}
//               className="mb-4 block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
//             >
//               {CardTitle}
//             </a>
//           </h3>
//           <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
//             {CardDescription}
//           </p>

//           {Button && (
//             <a
//               href={btnHref ? btnHref : "#"}
//               className="inline-block rounded-full border border-gray-3 px-7 py-2 text-base font-medium text-body-color transition hover:border-primary hover:bg-primary hover:text-white dark:border-dark-3 dark:text-dark-6"
//             >
//               {Button}
//             </a>
//           )}
//         </div>
//       </div>
//       {/*  */}
//     </>
//   );
// };
