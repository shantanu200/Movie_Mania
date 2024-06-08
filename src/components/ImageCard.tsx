import { Image, View } from '@gluestack-ui/themed'
import React from 'react'
import { IImageDetails } from '../interfaces/IMovie'
import { IMAGE_URL } from '../api/constant';

interface Props {
    image: IImageDetails;
}

const ImageCard : React.FC<Props> = ({image}) => {
  return (
    <View>
       <Image source={{uri:IMAGE_URL+image.file_path}} alt={image?.file_path}  />
    </View>
  )
}

export default ImageCard

