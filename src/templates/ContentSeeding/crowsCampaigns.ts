/**
 * C.R.O.W.S content-seeding campaigns.
 * Source list supplied for the Content Seeding template.
 * Rows 1, 8, and 9 start starred so the starred filter still has results.
 * Draft campaigns have no launch date, shown as "n/a".
 */

import type { BadgesStatusValue } from '../../components/Badge/BadgeStatus/BadgeStatus'
import type { BadgesStrategyValue } from '../../components/Badge/BadgeStrategy/BadgeStrategy'
import type { ContentSeedingRow } from '../../components/Table/TableContentSeeding'

type CrowsCampaign = {
  id:             number
  campaignName:   string
  client:         string
  strategy:       BadgesStrategyValue
  credit:         number
  status:         BadgesStatusValue
  launchedDate:   string
}

const STARRED_ROW_INDEXES = new Set([0, 7, 8])

export const CONTENT_SEEDING_PAGE_SIZE = 10

const CROWS_CAMPAIGNS: CrowsCampaign[] = [
  { id: 421, campaignName: 'Rebuild Trust in Local Commerce',              client: 'Taobao',                                      strategy: 'Neutralization', credit: -7,  status: 'Launched',  launchedDate: '2025-06-12' },
  { id: 408, campaignName: 'Reframe the Conversation on Family',           client: 'Sinyi Realty',                                strategy: 'Neutralization', credit: -14, status: 'Completed', launchedDate: '2025-05-18' },
  { id: 394, campaignName: 'Make Part-Time Work More Comfortable',         client: 'Mynavi',                                      strategy: 'Exposure',       credit: -3,  status: 'Launched',  launchedDate: '2025-04-10' },
  { id: 381, campaignName: 'Build Trust Through Fraud Awareness',          client: 'HSBC',                                        strategy: 'Exposure',       credit: -18, status: 'Inactive',  launchedDate: '2025-03-24' },
  { id: 367, campaignName: 'Reconnect Hong Kong Through Shared Stories',   client: 'MTR',                                         strategy: 'Neutralization', credit: -9,  status: 'Completed', launchedDate: '2025-02-14' },
  { id: 352, campaignName: 'Put Reproductive Rights on the Agenda',        client: 'Dentsu',                                      strategy: 'Exposure',       credit: -12, status: 'Launched',  launchedDate: '2025-01-30' },
  { id: 339, campaignName: 'Put Local Farmers in the Spotlight',           client: 'McDonald’s',                                  strategy: 'Exposure',       credit: -5,  status: 'Completed', launchedDate: '2025-01-16' },
  { id: 324, campaignName: 'Turn Pride into Brand Connection',             client: 'Uber',                                        strategy: 'Dilution',       credit: -16, status: 'Launched',  launchedDate: '2024-12-08' },
  { id: 311, campaignName: 'Challenge the Stigma Around Chronic Disease',  client: 'Novartis',                                    strategy: 'Neutralization', credit: -2,  status: 'Draft',     launchedDate: 'n/a' },
  { id: 296, campaignName: 'Bring Sustainable Living Closer to Home',      client: 'The Mills Fabrica',                           strategy: 'Dilution',       credit: -11, status: 'Completed', launchedDate: '2024-11-05' },
  { id: 283, campaignName: 'Turn Local Culture into Global Interest',      client: 'Google',                                      strategy: 'Distraction',    credit: -6,  status: 'Launched',  launchedDate: '2024-10-18' },
  { id: 269, campaignName: 'Turn AI Skeptics into Believers',              client: 'Microsoft',                                   strategy: 'Neutralization', credit: -19, status: 'Completed', launchedDate: '2024-09-26' },
  { id: 254, campaignName: 'Reframe Dating in the Birthrate Debate',       client: 'Pairs',                                       strategy: 'Dilution',       credit: -8,  status: 'Inactive',  launchedDate: '2024-09-11' },
  { id: 241, campaignName: 'Build Confidence in Ridesharing',              client: 'Uber',                                        strategy: 'Neutralization', credit: -4,  status: 'Launched',  launchedDate: '2024-08-29' },
  { id: 228, campaignName: 'Make Marine Waste Impossible to Ignore',       client: 'Korea Marine Environment Management Corporation', strategy: 'Exposure',   credit: -15, status: 'Completed', launchedDate: '2024-08-12' },
  { id: 213, campaignName: 'Make Health Conversations More Open',          client: 'Merck',                                       strategy: 'Neutralization', credit: -10, status: 'Draft',     launchedDate: 'n/a' },
  { id: 198, campaignName: 'Make Workplace Inclusion Visible',             client: 'Northstar Works',                             strategy: 'Exposure',       credit: -1,  status: 'Launched',  launchedDate: '2024-07-09' },
  { id: 184, campaignName: 'Turn Community Stories into Brand Trust',      client: 'Eastbridge',                                  strategy: 'Neutralization', credit: -13, status: 'Inactive',  launchedDate: '2024-06-20' },
  { id: 171, campaignName: 'Put Everyday Sustainability on the Agenda',    client: 'Greenline Living',                            strategy: 'Exposure',       credit: -6,  status: 'Completed', launchedDate: '2024-06-03' },
  { id: 157, campaignName: 'Make Youth Mental Health Easier to Discuss',   client: 'BrightPath',                                  strategy: 'Neutralization', credit: -17, status: 'Launched',  launchedDate: '2024-05-17' },
  { id: 143, campaignName: 'Turn Local Voices into Global Stories',        client: 'Harbor & Finch',                              strategy: 'Dilution',       credit: -4,  status: 'Draft',     launchedDate: 'n/a' },
  { id: 129, campaignName: 'Make Digital Safety More Human',               client: 'NexaPoint',                                   strategy: 'Exposure',       credit: -20, status: 'Completed', launchedDate: '2024-04-12' },
  { id: 116, campaignName: 'Challenge Old Ideas About Modern Families',    client: 'Seoul & Co.',                                 strategy: 'Dilution',       credit: -9,  status: 'Launched',  launchedDate: '2024-03-26' },
  { id: 102, campaignName: 'Bring Hidden Accessibility Issues Forward',    client: 'OpenFrame',                                   strategy: 'Exposure',       credit: -7,  status: 'Inactive',  launchedDate: '2024-03-08' },
  { id: 89,  campaignName: 'Make Public Transport Part of the Conversation', client: 'CityBridge',                                strategy: 'Neutralization', credit: -12, status: 'Draft',     launchedDate: 'n/a' },
  { id: 75,  campaignName: 'Turn Cultural Heritage into Connection',       client: 'Google Arts & Culture',                       strategy: 'Distraction',    credit: -5,  status: 'Launched',  launchedDate: '2024-02-02' },
]

export const CONTENT_SEEDING_ROWS: ContentSeedingRow[] = CROWS_CAMPAIGNS.map((campaign, index) => ({
  id:           String(campaign.id),
  campaignId:   campaign.id,
  campaignName: campaign.campaignName,
  client:       campaign.client,
  strategy:     campaign.strategy,
  credit:       campaign.credit,
  status:       campaign.status,
  launchedDate: campaign.status === 'Draft' ? 'n/a' : campaign.launchedDate,
  starred:      STARRED_ROW_INDEXES.has(index),
}))
