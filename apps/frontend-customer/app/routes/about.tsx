import { Card, Button } from '@fullstack-monorepo/ui-components';
import styles from '../app.module.css';

export default function AboutComponent() {
  return (
    <div className={styles.app}>
      <Card title="About Us">
        <p>This is the About page of our Customer Portal.</p>
        <p>This demo showcases how to use shared UI components across different applications in an NX monorepo.</p>
        <p>The same Button and Card components are used in both the Admin and Customer portals.</p>
        
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </Card>
    </div>
  );
}
