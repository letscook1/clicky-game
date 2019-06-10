import React, { Component } from 'react';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import flowers from './flowers.json';

// Set possible max score
const maxScore = flowers.length;

class App extends Component {
  // Setting this.state.flowers to the flowers json array
  state = {
    flowers,
    currentScore: 0,
    topScore: 0,
    selectedImages: [],
    gameMsg: 'Click a flower to begin!'
  };

  selectImage = id => {
    // If image has already been selected (i.e. included in the selectedImages array), then Game Over!
    if (this.state.selectedImages.includes(id)) {
      this.setState({ gameMsg: 'You just cant match it' });
      this.resetGame();
    }
    // Else, increment the score
    else {
      const score = this.state.currentScore + 1;

      // Update topScore if currentScore is greater than current topScore
      if (score > this.state.topScore) {
        this.setState({ topScore: score });
      }

      // If selected all images without repeating, then you win!
      if (score === maxScore) {
        this.setState({ gameMsg: 'Congratulations, you are a botanist!' });
        this.resetGame();
      }
      // Add current image id to selectedImages array, update score, shuffle images and continue playing
      else {
        this.setState({ gameMsg: 'You picked a new flower!' });
        this.setState({ selected: this.state.selectedImages.push(id) });
        this.setState({ currentScore: score });
        this.shuffleImages();
      }
    }
  };

  shuffleImages = () => {
    const shuffledImages = this.shuffleArray(flowers);
    this.setState({ flowers: shuffledImages });
  };

  // Shuffles array in place. ES6 version
  shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Resets the game parameters, shuffle images
  resetGame = () => {
    this.setState({ currentScore: 0 });
    this.setState({ selectedImages: [] });
    this.shuffleImages();
  };

  // Render the page
  render() {
    return (
      <div className="App">
        <Navbar
          title={'Clicky Game'}
          msg={this.state.gameMsg}
          score={this.state.currentScore}
          topScore={this.state.topScore}
        />
        <Header title={'Flowers'} instructions={'Get your flower game on'} />

        <Wrapper>
          {flowers.map(flower => (
            <ImageCard
              key={flower.id}
              id={flower.id}
              name={flower.name}
              image={flower.image}
              selectImage={this.selectImage}
            />
          ))}
        </Wrapper>
        <Footer title={'World flowers Clicky Game'} />
      </div>
    );
  }
}

export default App;
