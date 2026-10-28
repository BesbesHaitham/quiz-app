import '../src/index.css';
import StoryFrame from './StoryFrame';

export default {
  decorators: [
    (Story, context) => (
      <StoryFrame theme={context.globals.theme} size={context.parameters.frame}>
        <Story />
      </StoryFrame>
    ),
  ],
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Thème des composants',
      toolbar: {
        title: 'Thème',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { test: 'off' },
    options: {
      storySort: {
        order: ['Configurer le projet', 'Atomes', 'Molécules', 'Organismes', 'Modèles'],
      },
    },
  },
  tags: ['autodocs'],
};
