import styles from "./page.module.css";
import Link from "next/link";

interface PageProps {
    searchParams: {
        filter: string | undefined;
    }
}

async function getPosts(filter: string) {
    return new Promise<string[]>((resolve) => {
        setTimeout(() => resolve([`${filter} post 1`, `${filter} post 2`, `${filter} post 3`]), 5000);
    })
}

export default async function Home({searchParams}: PageProps) {
    const posts = await getPosts(searchParams.filter ?? 'all');

    return (
        <main className={styles.main}>
            <div className={styles.filters}>
                Apply filter:
                <ul>
                    <li className={!searchParams.filter ? styles.selected : undefined}><Link href="/">all</Link></li>
                    <li className={searchParams.filter == 'top' ? styles.selected : undefined}><Link href="/?filter=top">top rated</Link></li>
                    <li className={searchParams.filter == 'newest' ? styles.selected : undefined}><Link href="/?filter=newest">newest</Link></li>
                </ul>
            </div>
            <div>
                {posts.map((p, i) => <div key={i}>{p}</div>)}
            </div>
        </main>
    );
}
