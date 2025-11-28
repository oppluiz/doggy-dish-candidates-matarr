import React, { Fragment } from 'react'

import type { Page, Post } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ContentBlock as ContentBlockComponent } from '@/blocks/ContentBlock/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { VideoHeroBlock } from '@/blocks/VideoHero/Component'
import { AuthorBlock } from '@/blocks/Author/Component'
import { IngredientTabsBlock } from '@/blocks/IngredientTabs/Component'
import { ReferencesBlock } from '@/blocks/References/Component'
import { HowToSectionsBlock } from '@/blocks/HowToSections/Component'
import { HowToInformationBlock } from '@/blocks/HowToInformation/Component'
import { TabbedContentBlock } from '@/blocks/TabbedContent/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { HealthSectionsBlock } from '@/blocks/HealthSections/Component'
import { SinglePageHeroBlock } from '@/blocks/SinglePageHero/Component'
import { SearchLayoutBlock } from '@/blocks/SearchLayout/Component'
import { OnboardingChecklistBlock } from '@/blocks/OnboardingChecklist/Component'
import { FeaturedBlock } from '@/blocks/Featured/Component'
import { ToggledCollectionsBlock } from '@/blocks/ToggledCollections/Component'
import { RecentWorkshopsBlock } from '@/blocks/RecentWorkshops/Component'
import { RecipeHeroBlock } from '@/blocks/RecipeHero/Component'
import { HubHeroBlock } from '@/blocks/HubHero/Component'
import IconSliderBlock from '@/blocks/IconSlider/Component'
import SliderBlock from '@/blocks/SliderBlock/Component'
import TestimonialBlock from '@/blocks/Testimonial/Component'
import { FeaturedWorkshopBlock } from '@/blocks/FeaturedWorkshop/Component'
import { AboutHeroBlock } from '@/blocks/AboutHero/Component'
import { AboutTextImageBlock } from '@/blocks/AboutTextImage/Component'
import { AboutBannerBlock } from '@/blocks/AboutBanner/Component'
import { AboutTextSliderBlock } from '@/blocks/AboutTextSlider/Component'
import { ContactHeroBlock } from '@/blocks/ContactHero/Component'
import { ContactInfoBlock } from '@/blocks/ContactInfo/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  VideoHero: VideoHeroBlock,
  author: AuthorBlock,
  singlePageHero: SinglePageHeroBlock,
  ingredientTabs: IngredientTabsBlock,
  References: ReferencesBlock,
  howToSections: HowToSectionsBlock,
  howToInformation: HowToInformationBlock,
  tabs: TabsBlock,
  tabbedContent: TabbedContentBlock,
  healthSections: HealthSectionsBlock,
  contentBlock: ContentBlockComponent,
  searchLayout: SearchLayoutBlock,
  onboardingChecklist: OnboardingChecklistBlock,
  featured: FeaturedBlock,
  iconSlider: IconSliderBlock,
  toggledCollections: ToggledCollectionsBlock,
  recentWorkshops: RecentWorkshopsBlock,
  recipeHero: RecipeHeroBlock,
  hubHero: HubHeroBlock,
  slider: SliderBlock,
  testimonial: TestimonialBlock,
  featuredWorkshop: FeaturedWorkshopBlock,
  aboutHero: AboutHeroBlock,
  aboutTextImage: AboutTextImageBlock,
  aboutBanner: AboutBannerBlock,
  aboutTextSlider: AboutTextSliderBlock,
  contactHero: ContactHeroBlock,
  contactInfo: ContactInfoBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  title?: string
}> = (props) => {
  const { blocks, title } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  <Block {...block} disableInnerContainer pageTitle={title} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
