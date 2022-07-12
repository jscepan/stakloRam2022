type imageType = 'placeholder' | 'avatar' | 'initials';
type imageSize = 'large' | 'medium' | 'small' | 'extra-small';
type imageShape = 'squared' | 'rounded' | 'circled';

export interface MeUserImageI {
  type: imageType;
  size: imageSize;
  shape: imageShape;
  initials?: string;
  imageUrl?: string;
  alt?: string;
}
