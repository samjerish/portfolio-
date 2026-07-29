export default class GithubActivity {
    static async getActivityScore(username: string): Promise<number> {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
            
            if (!response.ok) {
                console.warn('Failed to fetch GitHub activity:', response.statusText);
                return 0; // Default to 0 on failure
            }

            const events = await response.json();
            
            // Calculate a score based on events in the last 14 days
            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

            let score = 0;

            for (const event of events) {
                const eventDate = new Date(event.created_at);
                if (eventDate > twoWeeksAgo) {
                    // Different events carry different weights
                    if (event.type === 'PushEvent') {
                        score += 3;
                    } else if (event.type === 'CreateEvent') {
                        score += 2;
                    } else if (event.type === 'PullRequestEvent') {
                        score += 3;
                    } else {
                        score += 1;
                    }
                }
            }

            return score;
        } catch (error) {
            console.error('Error fetching GitHub activity:', error);
            return 0; // Default to 0 on error
        }
    }
}
