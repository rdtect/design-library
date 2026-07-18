// ponytail: hardcoded articles for MVP; vault scanner in Phase 2
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}

export const articles: Article[] = [
  {
    id: "01-architects-ai-leaders",
    title: "Architects Are Natural AI Leaders",
    excerpt: "Design thinking and systems architecture are the core skills for leading agentic teams. Architects who understand constraints, trade-offs, and human needs are best positioned to shape AI workflows.",
    url: "/architects-ai-leaders"
  },
  {
    id: "02-content-income-engine",
    title: "Content as Income Engine — Piece #2",
    excerpt: "Building an audience through consistent, valuable content creation unlocks multiple revenue streams: sponsorships, products, services, and speaking engagements.",
    url: "/content-income-engine"
  },
  {
    id: "03-ai-as-intern",
    title: "AI is an Intern, Not a Master",
    excerpt: "Effective AI use treats models as capable assistants that need direction, validation, and judgment. The leverage comes from your taste and taste-formation, not the model's autonomy.",
    url: "/ai-as-intern"
  },
  {
    id: "case-01-iff-gbs",
    title: "Case Study: IFF Global Business Services Hub",
    excerpt: "Redesigning a 2.8M sqft commercial campus for distributed work. Used ABW principles with integrated wellness, technology, and hospitality layers to create a hub that attracts top talent.",
    url: "/case-studies/iff-gbs"
  },
  {
    id: "case-02-7eleven-bengaluru",
    title: "Case Study: 7-Eleven Bengaluru",
    excerpt: "Workplace strategy for 15K+ franchisees across India. Implemented hub-spoke model with franchisee support centers, training facilities, and community spaces to strengthen the network.",
    url: "/case-studies/7eleven-bengaluru"
  },
  {
    id: "case-03-fidelity-bengaluru",
    title: "Case Study: Fidelity Bengaluru",
    excerpt: "Tech center transformation for 5K+ engineers. Combined cutting-edge workspace design with India-specific needs: wellness, cultural celebration spaces, and high-bandwidth collaboration.",
    url: "/case-studies/fidelity-bengaluru"
  }
];
