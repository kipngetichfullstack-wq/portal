import { db } from './db';
import { users, posts } from './schema';
import { hashPassword } from './auth';

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const hashedPassword = await hashPassword('1234');
  
  await db.insert(users).values({
    email: 'ruto365@gmail.com',
    name: 'Kipngetich Ruto',
    password: hashedPassword,
    role: 'client',
    company: 'ImaraVault Ltd',
    phone: '+254 716350600',
  }).onConflictDoNothing();

  // Create sample blog posts
  const blogPosts = [
    {
      title: 'The Rise of Mobile Money Fraud in East Africa: Protection Strategies',
      slug: 'mobile-money-fraud-protection-east-africa',
      excerpt: 'Analyzing the latest trends in M-Pesa and mobile money fraud across Kenya, Uganda, and Tanzania, with practical protection strategies for financial institutions.',
      content: 'Mobile money platforms like M-Pesa have revolutionized financial services across East Africa...',
      category: 'Mobile Security',
      tags: 'M-Pesa, Mobile Money, Fraud Protection, Kenya, Uganda, Tanzania',
      author: 'Dr. Michael Wanjiku',
      authorImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      image: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg',
      published: true
    },
    {
      title: 'Kenya Data Protection Act: Compliance Guide for East African Businesses',
      slug: 'kenya-data-protection-act-compliance-guide',
      excerpt: 'A comprehensive guide to achieving compliance with Kenya\'s Data Protection Act and its implications for businesses operating across East Africa.',
      content: 'The Kenya Data Protection Act represents a significant milestone in regional data privacy legislation...',
      category: 'Compliance',
      tags: 'Data Protection, Kenya DPA, Compliance, East Africa, GDPR',
      author: 'Ahmed Hassan',
      authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      image: 'https://images.pexels.com/photos/5668769/pexels-photo-5668769.jpeg',
      published: true
    }
  ];

  for (const post of blogPosts) {
    await db.insert(posts).values(post).onConflictDoNothing();
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });