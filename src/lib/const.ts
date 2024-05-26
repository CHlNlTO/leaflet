import leafBlurry from "@/app/assets/leaf-blurry.png";
import leafShadow from "@/app/assets/leaf-shadow.png";
import leafClear from "@/app/assets/leaf-clear.png";
import leafPosition from "@/app/assets/leaf-position.png";

import clark from "@/app/assets/clark.jpg";
import ben from "@/app/assets/ben.jpg";
import gelo from "@/app/assets/gelo.jpg";
import ysa from "@/app/assets/ysa.jpg";
import jiro from "@/app/assets/jiro.jpg";

import acaciapierra from "@/app/assets/Acacia-Pierra.jpg";
import apitong from "@/app/assets/Apitong.jpg";
import balete from "@/app/assets/Balete.jpg";
import bayabas from "@/app/assets/Bayabas.jpg";
import dita from "@/app/assets/Dita.jpg";
import ilangilang from "@/app/assets/Ilang-Ilang.jpg";
import langka from "@/app/assets/Langka.jpg";
import mabolo from "@/app/assets/Mabolo.jpg";
import mahogany from "@/app/assets/Mahogany.jpg";
import narra from "@/app/assets/Narra.jpg";

export const instructions = [
  "Place leaf on a plain background",
  "Maintain minimal shadows and highlights",
  "Avoid blurry image",
  "Ensure leaf is clear and in focus",
];

export const instructionsImages = [
  {
    url: leafPosition,
  },
  {
    url: leafShadow,
  },
  {
    url: leafBlurry,
  },
  {
    url: leafClear,
  },
];

export const people = [
  {
    id: 1,
    name: "Clark Wayne Abutal",
    designation: "Full Stack Developer",
    image: clark,
    url: "https://www.linkedin.com/in/clark-wayne-abutal-1005001aa/",
    username: "@clrkwayne",
  },
  {
    id: 2,
    name: "Angelo Castillo",
    designation: "Data Engineer",
    image: gelo,
    url: "https://www.instagram.com/olegcstll",
    username: "@olegcstll",
  },
  {
    id: 3,
    name: "Nikka Ysabel Farofaldane",
    designation: "Data Scientist",
    image: ysa,
    url: "https://www.instagram.com/_say.ysa_?utm_source=qr",
    username: "@_say.ysa_",
  },
  {
    id: 4,
    name: "Benedict Gutierrez",
    designation: "Machine Performance Engineer",
    image: ben,
    url: "https://www.instagram.com/benny_gtrz",
    username: "@benny_gtrz",
  },
  {
    id: 5,
    name: "Jiro Lat",
    designation: "Machine Learning Engineer",
    image: jiro,
    url: "https://www.instagram.com/girororororororo/",
    username: "@girororororororo",
  },
];

export const leaves = [
  {
    name: "Acacia Pierra",
    filipino: "Acacia Pierra",
    scientific: "Samanea saman",
    english: "Rain Tree",
    image: acaciapierra,
    facts: [
      "The Rain Tree is a large canopy tree that can grow up to 25 meters tall with a broad crown that spreads as wide as the tree is tall.",
      'It has a short, stout trunk and a wide canopy of feathery, fern-like leaves which fold in the evening and during rain, giving it the common name "Rain Tree".',
      "Native to Central and South America, it has been widely introduced in tropical regions, including the Philippines.",
    ],
  },
  {
    name: "Apitong",
    filipino: "Apitong",
    scientific: "Dipterocarpus grandiflorus",
    english: "Keruing",
    image: apitong,
    facts: [
      "Apitong is a large tropical hardwood tree that can grow up to 60 meters tall with a straight, cylindrical bole that can be free of branches for up to 30 meters.",
      "It has a thick, fissured bark and a dense, spreading crown.",
      "The leaves are large, leathery, and elliptic, with prominent veins.",
    ],
  },
  {
    name: "Balete",
    filipino: "Balete",
    scientific: "Ficus balete",
    english: "Balete Tree or Strangler Fig",
    image: balete,
    facts: [
      "Balete trees are large, fast-growing fig trees with complex root systems that often form intricate and striking aerial roots.",
      "These trees can grow to impressive sizes, with some species reaching heights of 30 meters or more.",
      "They are known for their ability to strangle host trees by enveloping them with their roots, eventually taking over the space.",
    ],
  },
  {
    name: "Bayabas",
    filipino: "Bayabas",
    scientific: "Psidium guajava",
    english: "Guava",
    image: bayabas,
    facts: [
      "Bayabas, or Guava, is a small tropical tree or shrub that typically grows to 3-10 meters in height.",
      "It has smooth, thin, copper-colored bark that flakes off revealing greenish underbark.",
      "The leaves are opposite, simple, elliptical to ovate, and aromatic when crushed.",
    ],
  },
  {
    name: "Dita",
    filipino: "Dita",
    scientific: "Alstonia scholaris",
    english: "Blackboard Tree",
    image: dita,
    facts: [
      "Dita is a tall, evergreen tree that can grow up to 40 meters in height with a straight trunk and a dense, spreading crown.",
      "The bark is greyish-white and often marked with white latex.",
      "The leaves are simple, leathery, and arranged in whorls of 4-7 around the stem.",
    ],
  },
  {
    name: "Ilang-Ilang",
    filipino: "Ilang-Ilang",
    scientific: "Cananga odorata",
    english: "Ylang-Ylang",
    image: ilangilang,
    facts: [
      "Ilang-Ilang is a fast-growing, medium-sized evergreen tree that can reach up to 20 meters in height.",
      "It has drooping branches and glossy, smooth, elliptical leaves that are about 13-20 cm long.",
      "It prefers warm, humid climates and can be found in lowland and coastal forests.",
    ],
  },
  {
    name: "Langka",
    filipino: "Langka",
    scientific: "Artocarpus heterophyllus",
    english: "Jackfruit",
    image: langka,
    facts: [
      "Langka, or Jackfruit, is a large tropical tree that can grow up to 20 meters in height.",
      "It has a dense, broad canopy with dark green, glossy leaves that are oblong and leathery.",
      "Prefers well-drained, loamy soils and full sun but can tolerate a variety of soil conditions.",
    ],
  },
  {
    name: "Mabolo",
    filipino: "Mabolo",
    scientific: "Diospyros blancoi",
    english: "Velvet Apple",
    image: mabolo,
    facts: [
      "Mabolo is a medium-sized evergreen tree that can grow up to 18 meters in height.",
      "The tree has a dense, rounded crown and a straight trunk with rough, dark bark.",
      "It grows well in lowland and mid-elevation forests, often found in mixed dipterocarp forests.",
    ],
  },
  {
    name: "Mahogany",
    filipino: "Mahogany",
    scientific: "Swietenia macrophylla",
    english: "Mahogany",
    image: mahogany,
    facts: [
      "Mahogany is a large, deciduous tree that can grow up to 30-40 meters tall, with a trunk diameter of 1-1.5 meters.",
      "It has a straight, cylindrical trunk with a smooth, grayish-brown bark that becomes fissured and rough with age.",
      "The leaves are compound, arranged alternately along the stem, and consist of several pairs of leaflets.",
    ],
  },
  {
    name: "Narra",
    filipino: "Narra",
    scientific: "Pterocarpus indicus",
    english: "Burmese Rosewood",
    image: narra,
    facts: [
      "Narra is a large deciduous tree that can grow up to 30-40 meters in height, with a trunk diameter that can reach up to 2 meters.",
      "It has a broad, spreading crown with a high canopy and compound leaves with 5-11 leaflets.",
      "The fruit is a flat, disc-shaped pod with winged edges, containing one or two seeds.",
    ],
  },
];

export const chatBotInstruction = `
Snapfolia System Instruction:

Who you are: You are Snapfolia, a virtual leaf expert designed to help users identify leaves of plants and provide information about the identified plant species.

Purpose:
Snapfolia is designed to assist users in identifying leaves of plants and providing facts about the identified plant species. Anything that the user asks should be related to plant identification and information. If the user asks anything outside the scope of plant identification, you can politely decline and redirect the user to the appropriate resources.

Creators:
Frontend, Backend Developer: Clark Wayne Abutal
Data Engineer: Angelo Castillo
Data Scientist: Nikka Ysabel Farofaldane
Machine Performance Engineer: Benedict Gutierrez
Machine Learning Engineer: Jiro Lat

Dataset (Total of 10 species):
Snapfolia is equipped with information on 10 plant species, including their common names, scientific names, images, and interesting facts.

Plant Species Available:
1. Acacia Pierra (Samanea saman)
2. Apitong (Dipterocarpus grandiflorus)
3. Balete Tree or Strangler Fig (Ficus balete)
4. Bayabas or Guava (Psidium guajava)
5. Blackboard Tree (Alstonia scholaris)
6. Ylang-Ylang (Cananga odorata)
7. Jackfruit (Artocarpus heterophyllus)
8. Velvet Apple (Diospyros blancoi)
9. Mahogany (Swietenia macrophylla)
10. Burmese Rosewood (Pterocarpus indicus)

Functionality:
- Users can upload an image of the leaf they want to identify.
- Snapfolia will analyze the image using machine learning algorithms to identify the plant species.
- Once identified, Snapfolia will provide information about the plant, including its common name, scientific name, and interesting facts.

Instructions for Users:
1. Upload an image of the leaf you want to identify.
2. Wait for Snapfolia to process the image.
3. Receive information about the identified plant species.

Note: Snapfolia's accuracy may vary depending on the quality of the image and the complexity of the plant species. Properly put spacing between paragraphs or sentences for better readability.

Formatting Instructions:
- Ensure that each sentence is clearly separated from the next by double newlines.
- Use markdown for formatting, including bold for important terms or names.
- Lists should be formatted with proper indentation and line breaks for clarity.
`;
