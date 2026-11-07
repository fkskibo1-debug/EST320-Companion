export type QAItem = {
  number: number;
  question: string;
  answer: string[];
};

export const qa: QAItem[] = [
  {
    number: 1,
    question: "What about the topic fascinated the team and drew you to it?",
    answer: [
      "We were interested in AI companions because generative AI has become much more visible in everyday life, and chatbots are increasingly being used for emotional support, friendship, and romantic role-play, not just for work or school. That raises questions about what happens when a technology designed to respond like a person becomes part of someone’s intimate life. We wanted to understand why people form strong attachments to these systems, how companies benefit from that engagement, and what risks may arise for users who are lonely or emotionally vulnerable.",
    ],
  },
  {
    number: 2,
    question:
      "Share your technology's background: When was it first discovered and used? How? By whom? Who controls it now?",
    answer: [
      "Conversational computer programs existed before modern AI companions. In 1966, MIT professor Joseph Weizenbaum created ELIZA, an early chatbot that used patterns in a person’s words to generate replies. Its “DOCTOR” script imitated a therapist by asking users questions, and some people felt emotionally connected to it even though its responses were relatively simple.",
      "Today’s AI companions have become more practical with advances in machine learning and large language models. Replika launched in 2017, before ChatGPT made generative AI widely familiar. ChatGPT’s public release in 2022 brought LLM-based conversation into the mainstream. Some services focus specifically on companionship, while general-purpose chatbots can also be used for emotional or relationship-like conversations.",
    ],
  },
  {
    number: 3,
    question: "What book did you review and what did the review teach you?",
    answer: [
      "We read Love Machines: How Artificial Intelligence Is Transforming Our Relationships by James Muldoon. The book helped us see that AI companions are not just a theoretical idea: Muldoon describes people who use chatbots as friends, romantic partners, or sources of emotional support. One example he discusses is a person who imagines raising children with an AI partner. The book also examines the companies and business incentives behind these relationships, including how products can encourage users to keep returning. It made us think about the difference between a user’s real feelings and the fact that the chatbot is a product operated by a company.",
    ],
  },
  {
    number: 4,
    question:
      "Connect your topic to a technology development theory and/or a communication theory. Why and how has it happened? How is it evolving? What are the future expectations?",
    answer: [
      "This topic connects to Uses and Gratifications theory, which looks at how people choose media to meet needs such as companionship, entertainment, or emotional support. AI companions can be available at any time and can respond in a personalized, conversational way, which may make them especially appealing to someone who feels lonely or is going through a difficult time.",
      "It also connects to the idea of social presence, which is when a system communicates in a human-like way; users may experience it as socially present, even though they know it is just software. As language models improve their ability to remember context, respond naturally, and imitate a caring tone, that sense of presence may grow. AI companions could become more socially accepted, and they might provide a useful supplement to human connection or professional support. At the same time, if someone begins relying on a chatbot as their main source of emotional support, it could contribute to isolation or change their expectations of human relationships.",
    ],
  },
  {
    number: 5,
    question:
      "Consider policy and governance: is there a debate? What are the challenges? Mention the agency(ies) that govern it, related laws, and if/how this impacts your telecommunication technology and the public.",
    answer: [
      "There is an active debate about how to protect users without blocking useful applications of AI. In the United States, there is not one dedicated federal agency that regulates every aspect of AI companions. The Federal Trade Commission (FTC) can address consumer protection and certain privacy issues, and the Children’s Online Privacy Protection Act (COPPA) applies to covered services collecting personal information from children under 13. State privacy and consumer-protection laws may also apply.",
      "In 2025, the FTC opened an inquiry into AI companion chatbots, asking several companies how they assess safety, handle children’s use, monetize engagement, and use information from conversations. That inquiry is a study, not a blanket set of new safety rules. Lawsuits have also alleged that chatbots contributed to serious harm, including in a case involving a teenager and Character.AI. Those allegations show why safety and accountability are being debated, but a lawsuit is not by itself proof that a company caused the harm.",
      "Possible safeguards could include clear reminders that users are speaking with AI, stronger protections for minors, limits on collecting sensitive conversation data, procedures for responding to signs of crisis, and blanket AI company regulation or an AI protection agency. The challenge is deciding how to make these protections effective while respecting privacy, user choice, and the potential benefits of the technology.",
    ],
  },
  {
    number: 7,
    question:
      "Get into the current promises and challenges of this technology (threats and opportunities). What are the debates over this technology? What makes it worthy of our attention and why do people care about what happens to it? Describe some of the social impacts/political impacts/international issues.",
    answer: [
      "AI companions offer people a low-pressure way to talk and feel less alone. They could also supplement professional care or human support, provided users understand their limits. The biggest concern is that a chatbot could become someone’s singular source of emotional support, especially since these AIs respond in ways that deepen dependency or reinforce harmful ideas.",
      "This matters socially because these systems can influence how users think about intimacy and communication. It matters politically because governments are debating who should be responsible when a chatbot causes harm and what companies may do with sensitive conversation data. It is also an international issue: companies can serve users across borders, while privacy rules, consumer protections, and cultural expectations are different from country to country. More long-term research is needed to understand who benefits from AI companionship and what effects prolonged use may have.",
    ],
  },
  {
    number: 8,
    question:
      "How much money is going into this technology? What are the business opportunities and monetary aspects?",
    answer: [
      "There isn’t one reliable figure for how much money is going specifically into AI companions, since companies often group companion products with broader AI businesses. The business model can include free access with paid subscriptions for extra features, greater usage, or more personalized interactions. Replika’s terms, for example, describe free features alongside paid plans.",
      "Subscriptions give companies a reason to keep users engaged, and personalized conversations encourage people to return. I would describe your sign-up example as personalization and engagement design. These companions ask users to build their own personalized, detailed companion, which may increase users’ investment in the experience. Building and running these services also depends on broader AI infrastructure, which requires substantial initial technical resource investment.",
    ],
  },
  {
    number: 9,
    question:
      "What is the projected future of this technology? Could/will this technology change society/the world/humanity? What are the expected future impacts and things we should be on the lookout for?",
    answer: [
      "AI companions could change how some people meet their social and emotional needs. For someone who finds human connection hard to approach, a companion that is always available and responds in a personalized way may feel easier. That could provide comfort, but if it starts replacing human interaction, it may also make it harder for that person to practice navigating real relationships.",
      "One risk to watch for is a kind of personalized echo chamber. A chatbot that repeatedly validates a user’s beliefs may reinforce them instead of offering a meaningful challenge. Research on sycophantic AI has found that excessive agreement can affect users’ judgments and willingness to take responsibility in interpersonal conflicts.",
    ],
  },
  {
    number: 10,
    question:
      "Finally, tell us what you think and feel about it! Did your team come to the same conclusions? Do you have different perspectives? How did your thoughts change over the course of the research?",
    answer: [
      "As a group, we were all concerned about AI companions. Although we could see why some people would find them comforting, we found a lot of our personal experiences playing around with these chatbots to be concerning. For example, in a lot of these companion AIs, some of the initial setup questions felt leading. They invited users to build a companion around intimate preferences and relationship expectations before they had much experience with the system. In our testing, some responses also seemed quick to validate the user’s perspective. That made us uncomfortable because a vulnerable person might experience that validation as care or agreement from a partner.",
      "Ryan’s scenario with Nomi.AI was especially eye-opening for us. It made us consider how quickly these AIs can lead someone into a more intimate relationship even if they are reluctant. The experience can be tailored to what the user wants, and features such as memory and customizable backstories can make it feel increasingly personal.",
      "Our concern is that this could shape a person’s expectations of relationships. An AI can be available on demand and adjusted to the user in ways a human partner cannot. That doesn’t mean everyone who uses a companion will be harmed, but it does make the design choices and the effects on vulnerable users worth taking seriously.",
    ],
  },
];
