import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FormattingToolbar,
  FormattingToolbarController,
  ImageCaptionButton,
  NestBlockButton,
  ReplaceImageButton,
  TextAlignButton,
  UnnestBlockButton
} from '@blocknote/react';

export default function CustomToolbar() {
  return (
    <FormattingToolbarController
      formattingToolbar={() => (
        <FormattingToolbar>
          <BlockTypeSelect key={'blockTypeSelect'} />

          <span className="mx-1 text-gray-500 select-none">|</span>

          {/* Extra button to toggle blue text & background */}
          {/* <BlueButton key={"customButton"} /> */}

          <ImageCaptionButton key={'imageCaptionButton'} />
          <ReplaceImageButton key={'replaceImageButton'} />

          {/* text style buttons */}
          <BasicTextStyleButton basicTextStyle={'bold'} key={'boldStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'italic'} key={'italicStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'underline'} key={'underlineStyleButton'} />
          <BasicTextStyleButton basicTextStyle={'strike'} key={'strikeStyleButton'} />
          <BasicTextStyleButton key={'codeStyleButton'} basicTextStyle={'code'} />

          <span className="mx-1 text-gray-500 select-none">|</span>

          {/* alignment buttons */}
          <TextAlignButton textAlignment={'left'} key={'textAlignLeftButton'} />
          <TextAlignButton textAlignment={'center'} key={'textAlignCenterButton'} />
          <TextAlignButton textAlignment={'right'} key={'textAlignRightButton'} />
          <TextAlignButton textAlignment={'justify'} key={'textAlignJustifyButton'} />

          <span className="mx-1 text-gray-500 select-none">|</span>

          {/* color button */}
          <ColorStyleButton key={'colorStyleButton'} />

          <span className="mx-1 text-gray-500 select-none">|</span>

          {/* nesting buttons */}
          <NestBlockButton key={'nestBlockButton'} />
          <UnnestBlockButton key={'unnestBlockButton'} />

          <span className="mx-1 text-gray-500 select-none">|</span>

          {/* link button */}
          <CreateLinkButton key={'createLinkButton'} />
        </FormattingToolbar>
      )}
    />
  );
}
