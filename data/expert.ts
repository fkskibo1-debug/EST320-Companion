export type ExpertQuestion = {
  label: string;
  question: string;
  answer: string[];
};

export type Expert = {
  name: string;
  roles: string[];
  questions: ExpertQuestion[];
};

export const expert: Expert = {
  name: "Prof. Roger Thompson",
  roles: [
    "Founder and Co-Director of the RhetAI Coalition",
    "Director of Writing Programs and Professor, Arizona State University",
  ],
  questions: [
    {
      label: "Q1",
      question: "Do you think AI companions are damaging to the people who use them?",
      answer: [
        `"I have very deep concerns, and some existential angst sometimes... I'm a little worried we've lost the battle in terms of persuasive capacities at this point. I'm afraid we're too late. So the question then is: how do you build a resistance that might ultimately make change?`,
        `...Despite that anxiety, worry, and sometimes fear that we've given up too fast, I do see upside. I can imagine a scenario in which these are really positive for people. People who are feeling isolated, people from certain communities who may not feel connected, people who are geographically isolated, people from tough family circumstances who don't have the resources to navigate their world in meaningful ways. A chatbot might be able to help them with that...`,
        `But the problem is there's no constraint right now. What's driving a lot of this is not well-being or "human flourishing," to use the code words of the day. What's driving it is revenue, revenue, revenue. How can we create something that's super sticky? And of course, one of the best places to go is people who are more likely to be at risk, because those folks may be more dedicated to being in the thing.`,
        `...As those folks seek out human connection, and these things have a feeling of being human, which is a primal drive for us, what is the chatbot actually doing? Is it providing meaningful connection that can support their mental health and well-being? Or is it so artificial that the veneer itself is damaging? I don't know that we have a good answer to that.`,
        `...So, do I think it's damaging? Yes, I think we have plenty of evidence of how damaging it is. But the problem is, because we're focused on the concerns, I don't know that we have good evidence on the upsides. I can imagine a scenario where AI serves as a first screening tool that helps mental health practitioners identify risk factors... I don't know that we have the same documented evidence around that.`,
        `So I'm at the stage where I'm highly skeptical of the technologies, of the motivations of the people driving them, and of whether they really have humans' best interests in mind. At the same time, I'm somewhat neutral, because I don't think we've amassed the evidence to say for sure whether this is good or not.`,
        `What I can say definitively is that we shouldn't be experimenting on the human populace at large, which is what we're doing right now. These companies should be doing this in controlled settings, with peer-reviewed, pre-screened methodologies to mitigate harms, the same way you'd run a clinical trial for a new drug. Instead, we've unleashed them into the world and said, "Let's see how it goes," under the aegis of "this is a product anyone should be allowed to use.""`,
      ],
    },
    {
      label: "Q2",
      question: "How can we protect ourselves from that? What would your advice be?",
      answer: [
        `"...Of course, as a rhetoric person, I'm going to say being savvy about rhetoric matters, understanding how language works, even if you don't care about it as rhetoric.`,
        `The other piece is emotional self-regulation. Anything you can do to understand how your body and brain interact is critical, and figuring out what you can do about it. There are very basic interventions. Breathing exercises are the classic one... There are times you feel like you can't put your phone down, and just taking a couple of intentional breaths, it's amazing how much it defuses that...`,
        `Then there are university WPAs, writing program administrators... The problem is the technology was built so fast and normalized so quickly that even if I prohibit you from using ChatGPT in my class, there's no meaningful way to enforce that. So the question becomes: can I adopt a particular model within my class that might enculturate you to it?`,
        `So I think there's still room there. If a bunch of students organized and said, "Hey, WPAs, we want you to encourage only this technology and not that one, because we think it's a good company based on what we've seen, or because they're willing to work with us," that would be a point of real agency... If Anthropic, OpenAI, Grok, Gemini, any of them, realized people were organized, and that their pathway to normalizing their technology runs through the classroom, they would come to the table, no question.`,
        `College students are a target market. You're educated, but you're no more immune to the power of these technologies... If you organized in some way along with faculty, it would be pretty powerful..."`,
      ],
    },
  ],
};
