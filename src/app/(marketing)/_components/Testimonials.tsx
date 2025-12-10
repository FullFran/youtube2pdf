import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Jack F.",
      rating: 5,
      text: "I summarized my lecture in just a few seconds! <span class='font-bold text-yellow-400'> I was able to study faster </span>than I ever imagined",
      role: "Student",
      avatar:
        "https://pbs.twimg.com/profile_images/1784563357300740096/2DyzEa9d_400x400.jpg",
    },
    {
      name: "Larry",
      rating: 5,
      text: "No more taking notes by hand. <span class='font-bold text-green-400'>Just paste the link and download the PDF.</span> YouTube2PDF made everything seamless and stress-free!",
      role: "Researcher",
      avatar:
        "https://pbs.twimg.com/profile_images/1804234365817212928/n077GepN_400x400.jpg",
    },
    {
      name: "Gabriel",
      text: "YouTube2PDF is hands down <span class='font-bold text-blue-400'>the best study tool! </span>it’s the ultimate productivity hack for students.",
      role: "Developer",
      avatar:
        "https://pbs.twimg.com/profile_images/1757317042644918272/z22hY3Ji_400x400.jpg",
    },
    {
      name: "Yitai Goh",
      rating: 4,
      text: "Without YouTube2PDF, I’d still be watching 2-hour tutorials! <span class='font-bold text-purple-400'>It saved me countless hours </span>! and let me learn efficiently. ⚡️",
      role: "Life-long Learner",
      avatar:
        "https://pbs.twimg.com/profile_images/1761628238323802112/pXIc00nu_400x400.jpg",
    },
    {
      name: "Matt Merrick",
      text: "I used YouTube2PDF to study for my finals and <span class='font-bold text-pink-400'>aced my exams</span>! Thanks for this tool.",
      role: "Student",
      avatar:
        "https://pbs.twimg.com/profile_images/1865828164947099648/v0SAw6WI_400x400.jpg",
    },
    {
      name: "Tom Friday",
      rating: 5,
      text: "I used YouTube2PDF to summarize technical talks, and <span class='font-bold text-orange-400'>in just minutes I grasped the key concepts.</span>",
      role: "Engineer",
      avatar:
        "https://pbs.twimg.com/profile_images/1854135042152247311/9u2s6TX__400x400.jpg",
    },
  ];

  return (
    <div
      id="wall-of-love"
      className="min-h-screen bg-[#0F0F0F] text-white py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            1209 makers built AI tools, SaaS, and more
          </h1>
          <p className="text-gray-400 text-lg">
            They made their first $ online, and some even quit their 9-5!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-zinc-900 border-[1.4px] border-zinc-800 p-6 flex flex-col"
            >
              <div className="flex-grow">
                {testimonial.rating && (
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                )}

                <p
                  className="text-gray-300 mb-6"
                  dangerouslySetInnerHTML={{ __html: testimonial.text }}
                ></p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-700 mt-auto">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-base text-zinc-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
