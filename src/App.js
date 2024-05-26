import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Confetti from 'react-confetti';

const Container = styled.div`
  display: flex;
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
  height: 100vh;
  background: #ffe4e1; /* Pastel color */
`;

const Card = styled(animated.div)`
  width: 90%;
  max-width: 320px;
  height: 400px;
  perspective: 1000px;
`;

const CardInner = styled(animated.div)`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ff69b4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ff69b4;
  color: white;
  border-radius: 10px;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`;

const Text = styled.p`
  font-size: 1rem;
`;

const Hearts = styled.div`
  margin-top: 20px;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Heart = styled(animated.span)`
  display: inline-block;
`;

const HeartBack = styled(animated.span)`
  display: inline-block;
  font-size: 3.5rem;
`;

const App = () => {
  const [flipped, setFlipped] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const { transform } = useSpring({
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const heartAnimation = useSpring({
    loop: true,
    to: [{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    from: { transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  useEffect(() => {
    if (flipped) {
      setConfetti(true);
      const audio = new Audio('/anniversary.mpeg');
      audio.play();
    } else {
      setConfetti(false);
    }
  }, [flipped]);

  return (
    <Container>
      {confetti && <Confetti />}
      <Card onClick={() => setFlipped(!flipped)}>
        <CardInner style={{ transform }}>
          <CardFront>
            <Title>Happy Anniversary!</Title>
            <Hearts>
              <Heart style={heartAnimation} role="img" aria-label="heart">❤️</Heart>
              <Heart style={heartAnimation} role="img" aria-label="heart">❤️</Heart>
              <Heart style={heartAnimation} role="img" aria-label="heart">❤️</Heart>
            </Hearts>
          </CardFront>
          <CardBack>
            <Text>Wishing you a day filled with love and joy.</Text>
            <Text>Here's to many more wonderful years together!</Text>
            <HeartBack style={heartAnimation} role="img" aria-label="heart">❤️</HeartBack>
          </CardBack>
        </CardInner>
      </Card>
    </Container>
  );
}

export default App;
