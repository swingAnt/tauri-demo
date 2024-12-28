import  { useEffect, useState } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './index.css'
const recipeContent = `
## Delicious Pancakes
Here’s how to make **delicious pancakes**:

1. **Ingredients:**
   - 1 cup of flour
   - 1 egg
   - 1 cup of milk
   - 1 tablespoon of sugar
   - A pinch of salt

2. **Instructions:**
   - In a bowl, mix the dry ingredients.
   - Add the wet ingredients and stir until smooth.
   - Heat a frying pan and pour the batter into circles.
   - Cook until bubbles form on the surface and then flip.
   - Serve with syrup and enjoy!

You can find more recipes on [Recipe Blog](https://www.example.com).
  `;

const Result = () => {
  const [displayText, setDisplayText] = useState('');
  const [loading, setLoading] = useState(false);

  const simulateTyping = (text: string) => {
    let i = 0;
    console.log('=====3')

    const interval = setInterval(() => {
      console.log('=====4')

      setDisplayText((prev) => prev + text[i]);
      i += 1;
      if (i === text.length) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 50); // Adjust speed of typing here
  };

  useEffect(() => {
    console.log('=====1')
    if (recipeContent) {
      console.log('=====2')

      simulateTyping(recipeContent);
    }
  }, [recipeContent]);

  // Custom components for rendering Markdown
  const customComponents: Components = {
    code({ className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter style={docco} language={match[1]} children={String(children)} />
      ) : (
        <code className={className} style={{ backgroundColor: '#f1f1f1' }} children={children} />
      );
    },

  };

  return (
    <div className='result-container' style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Recipe Explanation</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ReactMarkdown children={displayText} components={customComponents} />
        </div>
      )}
    </div>
  );
};

export default Result;
