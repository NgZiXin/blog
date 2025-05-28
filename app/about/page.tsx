import Image from "next/image";

export default function About() {
  return (
    <main className="p-8 sm:p-12">
      <div className="max-w-screen-md w-full mx-auto flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
          <Image
            src="/about/profile.jpg"
            alt="Profile picture"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-3xl font-bold p-6">Hi! I am ZiXin</h1>
      <div className="text-base text-justify font-sans leading-relaxed text-gray-700 dark:text-gray-300 space-y-4">
        <p>
          Hi! I'm an incoming third-year student at the National University of
          Singapore, and I have a deep passion for endurance sports — especially
          running, cycling, and swimming. I love being outdoors and rarely stay
          still when I travel. Whether I'm exploring a city or hiking up a
          mountain, I'm always chasing a little adventure. In recent years, I've
          really grown to love travel. Southeast Asia has been my playground,
          with unforgettable experiences in Indonesia, Malaysia, and Thailand. I
          find joy in discovering hidden trails, scenic peaks, and the stories
          each place holds.
        </p>
        <p>
          This summer, I'll be heading to Hong Kong for an internship with
          Expando World Limited, and shortly after, I'll begin my semester
          exchange in Vancouver at Simon Fraser University. I'm incredibly
          excited to meet new people, immerse myself in different cultures, and
          keep exploring new places.
        </p>
        <p>
          This blog is where I'll be sharing some of my favorite memories and
          stories from my travels! :D
        </p>
      </div>
            </div>
    </main>
  );
}
