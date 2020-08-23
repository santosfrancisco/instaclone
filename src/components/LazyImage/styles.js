import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const Small = styled.ImageBackground`
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
`;

export const FullImage = styled(Animated.Image)`
  width: 100%;
  aspect-ratio: ${({ ratio }) => ratio};
`;
