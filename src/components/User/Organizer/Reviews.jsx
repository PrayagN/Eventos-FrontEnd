import React from "react";

function Reviews({ review }) {
  console.log(review);

  const calculateStars = (star) => {
    const stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push({ index: i, filled: true });
    }
    for (let i = star + 1; i <= 5; i++) {
      stars.push({ index: i, filled: false });
    }
    return stars;
  };

  const getMonth = (date) => {
    return new Date(date).toLocaleString("en-US", { month: "long" });
  };

  return (
    <>
      {review.map((review, index) => (
        <div className="flex justify-start mt-2" key={index}>
          <article>
            <div className="flex items-center mb-4 space-x-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={review.reviewedBy?.image}
                alt=""
              />
              <div className="space-y-1 font-medium text-black">
                <p>
                  {review.reviewedBy.username}{" "}
                  <time
                    dateTime="2014-08-16 19:00"
                    className="block text-sm text-gray-500 dark:text-gray-400"
                  >
                    reviewed on {getMonth(review.createdAt)} - {review.createdAt.slice(0, 4)}
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1">
              {calculateStars(review.rating).map((star) => {
                return (
                  <svg
                    key={star.index}
                    aria-hidden="true"
                    className={`w-5 h-5 ${star.filled ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Star {star.index}</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                );
              })}
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"></footer>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {review.review}
            </p>
          </article>
        </div>
      ))}
    </>
  );
}

export default Reviews;
