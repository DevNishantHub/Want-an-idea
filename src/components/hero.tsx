export default function Hero()
{
    return(
        <section className=" lg:grid w-full  pt-0 lg:place-content-center mt-20">
  <div className="flex flex-col items-center justify-center mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className=" max-w-prose text-center bg-black/50 py-10 px-10 rounded-4xl border-4 border-white ">
      <h1 className="text-6xl font-bold text-white sm:text-7xl">
        Want An
        <strong className="text-[#f2b229] "> IDEA </strong>
      </h1>

      <p className="mt-4 text-base text-pretty text-white  sm:text-lg/relaxed">
        Want An IDEA lets you share your tech ideas for others to use freely and explore ideas shared by the community.
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-[#f2b229] bg-[#f2b229] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#f2b229]"
          href="#"
        >
          Get Started
        </a>

        <a
          className="inline-block rounded border border-gray-900 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>

    );
}
