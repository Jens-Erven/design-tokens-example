import Button from './Button.jsx';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Button>button</Button>);
