export default function MakerIntro() {
  return (
    <div className="bg-[#212121] mb-8 text-gray-300 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-[200px] h-[200px] flex-shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg flex flex-col items-center justify-center p-6 text-center"
              style={{ backgroundImage: "url('/idee8.png')" }}
            ></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-white">
              Stop watching, start learning 🚀
            </h1>
            <p className="text-base">
              We love learning from YouTube, but watching hours of video content just to find one specific insight is time-consuming. Taking notes while watching is even harder.
            </p>
            <p className="text-base">
              So we built{" "}
              <a
                href="#"
                className="text-white hover:text-gray-200 underline underline-offset-2"
              >
                YouTube2PDF
              </a>{" "}
              to help students and life-long learners digest video content faster.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-base">Use YouTube2PDF to:</p>

          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-base">
              <span className="font-semibold text-white">Save time</span>—get the key takeaways in seconds without watching the whole video.
            </li>
            <li className="text-base">
              <span className="font-semibold text-white">Study better</span>
              —automatically generate study guides and summaries for your exams.
            </li>
            <li className="text-base">
              <span className="font-semibold text-white">
                Retain more
              </span>
              —read and review the content at your own pace in a clean PDF format.
            </li>
          </ol>

          <p className="text-base">
            Turn any educational video into a <span className="text-white font-semibold">perfect set of notes</span> instantly. 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
