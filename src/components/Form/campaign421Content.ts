/**
 * Campaign 421 content for the Form.
 * The first record is the opening topic. The second is added by "+ New Topic".
 * Each topic shows its first two comments, then "+ New Comment" reveals the rest in order.
 */

export type CampaignTopicContent = {
  title:    string
  content:  string
}

export type CampaignCommentContent = {
  id:       number
  content:  string
}

export type CampaignFormContent = {
  campaignId:   number
  campaignName: string
  platform:     string
  language:     string
  topic:        CampaignTopicContent
  comments:     CampaignCommentContent[]
}

export const CAMPAIGN_421_CONTENT: CampaignFormContent = {
  campaignId:   421,
  campaignName: 'Rebuild Trust in Local Commerce',
  platform:     'Facebook',
  language:     'English',
  topic: {
    title:   'Rebuild Trust in Local Commerce',
    content: 'Trust begins with transparency. As online shopping continues to reshape local commerce, consumers deserve clear product information, reliable service, and responsive customer support. This campaign invites shoppers and businesses to share their experiences, address common concerns, and build a more accountable digital marketplace where confidence and convenience can grow together.',
  },
  comments: [
    { id: 1, content: 'Love the idea! Just hope they actually follow through this time 🙏' },
    { id: 2, content: "Wait, are the return policies getting better too? That's what I'd like to see." },
    { id: 3, content: 'Had a good experience with a local seller recently. Quick replies and no surprises with the price 👍' },
  ],
}

export const CAMPAIGN_421_NEW_TOPIC: CampaignFormContent = {
  campaignId:   421,
  campaignName: 'Rebuild Trust in Local Commerce',
  platform:     'Facebook',
  language:     'English',
  topic: {
    title:   'What Makes You Come Back?',
    content: 'A shopping experience is about more than finding the right product. It’s the little things—honest descriptions, updates that help, and support that shows up when needed. We’re asking shoppers what keeps them coming back to local businesses, and what would make online shopping feel more personal, dependable, and worth recommending.',
  },
  comments: [
    { id: 1, content: 'I’ll happily pay a little more if the seller keeps me in the loop.' },
    { id: 2, content: 'Nothing worse than ordering something and then hearing absolutely nothing for a week 😅' },
    { id: 3, content: 'Honestly, a quick reply can turn a frustrating order into a reason to shop there again.' },
  ],
}
