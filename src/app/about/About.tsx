import Profiles from "@/components/component/Profiles";

export default function About() {
  return (
    <main className="bg-[#e2fce6] py-16 px-6 md:px-8 lg:px-12 h-screen">
      <div className="h-36 w-full flex flex-col justify-start items-center space-y-16 sm:space-y-36 gap-4">
        <div className="bg-[#e2fce6] w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-green-950 font-yeseva_one flex flex-col items-center justify-center text-center">
            Mission
          </h2>
          <p className="text-green-950 text-md font-cormorant_garamond font-semibold flex flex-col items-center justify-center text-center">
            To help users identify different types of leaves within the campus
            of FAITH.
          </p>
        </div>
        <div className="bg-[#e2fce6] w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-green-950 font-yeseva_one flex flex-col items-center justify-center text-center">
            Our Team
          </h2>
          <p className="text-green-950 text-md font-cormorant_garamond font-semibold flex flex-col items-center justify-center text-center">
            Meet the team behind the development of this web app.
          </p>
          <Profiles />
        </div>
        <div className="bg-[#e2fce6] w-full max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-green-950 font-yeseva_one flex flex-col items-center justify-center text-center">
            Contact Us
          </h2>
          <p className="text-green-950 text-md font-cormorant_garamond font-semibold flex flex-col items-center justify-center text-center">
            If you have any questions or feedback, feel free to reach out to us.
          </p>
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-green-950 text-md font-cormorant_garamond font-semibold">
              Email: example@example.com
            </p>
            <p className="text-green-950 text-md font-cormorant_garamond font-semibold">
              Phone: 123-456-7890
            </p>
            <p className="text-green-950 text-md font-cormorant_garamond font-semibold">
              Address: 123 Main Street, City, Country
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
