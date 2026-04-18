import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting database seeding...\n');

  // Clear existing data (optional - for clean seeding)
  console.log('📝 Clearing existing data...');
  await prisma.$transaction([
    prisma.borrowings.deleteMany(),
    prisma.profiles.deleteMany(),
    prisma.books.deleteMany(),
    prisma.categories.deleteMany(),
    prisma.users.deleteMany(),
  ]);
  console.log('✅ Cleared existing data\n');

  // ========== CREATE CATEGORIES ==========
  console.log('📚 Creating categories...');
  const categories = {
    fiction: await prisma.categories.create({ data: { name: 'Fiction' } }),
    nonFiction: await prisma.categories.create({ data: { name: 'Non-Fiction' } }),
    science: await prisma.categories.create({ data: { name: 'Science' } }),
    fantasy: await prisma.categories.create({ data: { name: 'Fantasy' } }),
    mystery: await prisma.categories.create({ data: { name: 'Mystery & Thriller' } }),
    biography: await prisma.categories.create({ data: { name: 'Biography & Memoir' } }),
    history: await prisma.categories.create({ data: { name: 'History' } }),
    technology: await prisma.categories.create({ data: { name: 'Technology' } }),
    selfHelp: await prisma.categories.create({ data: { name: 'Self-Help' } }),
    children: await prisma.categories.create({ data: { name: "Children's Books" } }),
  };
  console.log(`✅ Created ${Object.keys(categories).length} categories\n`);

  // ========== CREATE USERS ==========
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);

  const users = {
    admin: await prisma.users.create({
      data: {
        name: 'Admin User',
        email: 'admin@library.com',
        password: hashedAdminPassword,
        role: 'ADMIN'
      }
    }),
    librarian: await prisma.users.create({
      data: {
        name: 'Sarah Librarian',
        email: 'sarah@library.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    }),
    john: await prisma.users.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
    jane: await prisma.users.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
    mike: await prisma.users.create({
      data: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
    emily: await prisma.users.create({
      data: {
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
    david: await prisma.users.create({
      data: {
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
    lisa: await prisma.users.create({
      data: {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        password: hashedPassword,
        role: 'USER'
      }
    }),
  };
  console.log(`✅ Created ${Object.keys(users).length} users\n`);

  // ========== CREATE PROFILES ==========
  console.log('📝 Creating user profiles...');
  await prisma.profiles.createMany({
    data: [
      { userId: users.admin.id, address: '123 Library Street, NY 10001', phone: '+1 (555) 010-0001' },
      { userId: users.librarian.id, address: '456 Book Avenue, NY 10002', phone: '+1 (555) 010-0002' },
      { userId: users.john.id, address: '789 Reader Road, Boston, MA 02101', phone: '+1 (555) 010-0003' },
      { userId: users.jane.id, address: '321 Novel Lane, Chicago, IL 60601', phone: '+1 (555) 010-0004' },
      { userId: users.mike.id, address: '654 Chapter Street, Seattle, WA 98101', phone: '+1 (555) 010-0005' },
      { userId: users.emily.id, address: '987 Page Place, Austin, TX 78701', phone: '+1 (555) 010-0006' },
      { userId: users.david.id, address: '147 Story Drive, Denver, CO 80201', phone: '+1 (555) 010-0007' },
      { userId: users.lisa.id, address: '258 Plot Point, Portland, OR 97201', phone: '+1 (555) 010-0008' },
    ],
  });
  console.log(`✅ Created profiles for all users\n`);

  // ========== CREATE BOOKS ==========
  console.log('📖 Creating books...');
  
  const booksData = [
    // Fiction
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, categoryId: categories.fiction.id, available: false },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, categoryId: categories.fiction.id, available: true },
    { title: '1984', author: 'George Orwell', year: 1949, categoryId: categories.fiction.id, available: false },
    { title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, categoryId: categories.fiction.id, available: true },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', year: 1951, categoryId: categories.fiction.id, available: true },
    
    // Non-Fiction
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', year: 2011, categoryId: categories.nonFiction.id, available: false },
    { title: 'Becoming', author: 'Michelle Obama', year: 2018, categoryId: categories.nonFiction.id, available: true },
    { title: 'Educated', author: 'Tara Westover', year: 2018, categoryId: categories.nonFiction.id, available: true },
    
    // Science
    { title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', year: 2016, categoryId: categories.science.id, available: true },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', year: 1988, categoryId: categories.science.id, available: false },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', year: 1976, categoryId: categories.science.id, available: true },
    
    // Fantasy
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', year: 1937, categoryId: categories.fantasy.id, available: true },
    { title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', year: 1997, categoryId: categories.fantasy.id, available: false },
    { title: 'The Name of the Wind', author: 'Patrick Rothfuss', year: 2007, categoryId: categories.fantasy.id, available: true },
    
    // Mystery
    { title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', year: 2005, categoryId: categories.mystery.id, available: true },
    { title: 'Gone Girl', author: 'Gillian Flynn', year: 2012, categoryId: categories.mystery.id, available: false },
    { title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003, categoryId: categories.mystery.id, available: true },
    
    // Biography
    { title: 'Steve Jobs', author: 'Walter Isaacson', year: 2011, categoryId: categories.biography.id, available: true },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', year: 1947, categoryId: categories.biography.id, available: true },
    
    // History
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', year: 1997, categoryId: categories.history.id, available: true },
    { title: 'The Wright Brothers', author: 'David McCullough', year: 2015, categoryId: categories.history.id, available: true },
    
    // Technology
    { title: 'Clean Code', author: 'Robert C. Martin', year: 2008, categoryId: categories.technology.id, available: false },
    { title: 'The Pragmatic Programmer', author: 'David Thomas', year: 1999, categoryId: categories.technology.id, available: true },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', year: 2009, categoryId: categories.technology.id, available: true },
    
    // Self-Help
    { title: 'Atomic Habits', author: 'James Clear', year: 2018, categoryId: categories.selfHelp.id, available: false },
    { title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', year: 1936, categoryId: categories.selfHelp.id, available: true },
    
    // Children's Books
    { title: 'Charlotte\'s Web', author: 'E.B. White', year: 1952, categoryId: categories.children.id, available: true },
    { title: 'The Very Hungry Caterpillar', author: 'Eric Carle', year: 1969, categoryId: categories.children.id, available: true },
  ];

  const books = [];
  for (const bookData of booksData) {
    const book = await prisma.books.create({ data: bookData });
    books.push(book);
  }
  console.log(`✅ Created ${books.length} books\n`);

  // ========== CREATE BORROWINGS ==========
  console.log('🔄 Creating borrowing records...');
  
  const borrowingsData = [
    // Past borrowings (returned)
    { userId: users.john.id, bookId: books[0].id, borrow_date: new Date('2024-01-15'), returned_at: new Date('2024-01-30') },
    { userId: users.jane.id, bookId: books[2].id, borrow_date: new Date('2024-02-01'), returned_at: new Date('2024-02-15') },
    { userId: users.mike.id, bookId: books[5].id, borrow_date: new Date('2024-02-10'), returned_at: new Date('2024-02-25') },
    { userId: users.emily.id, bookId: books[9].id, borrow_date: new Date('2024-03-01'), returned_at: new Date('2024-03-20') },
    { userId: users.david.id, bookId: books[12].id, borrow_date: new Date('2024-03-05'), returned_at: new Date('2024-03-19') },
    { userId: users.lisa.id, bookId: books[15].id, borrow_date: new Date('2024-03-10'), returned_at: new Date('2024-03-25') },
    { userId: users.john.id, bookId: books[18].id, borrow_date: new Date('2024-04-01'), returned_at: new Date('2024-04-10') },
    { userId: users.jane.id, bookId: books[21].id, borrow_date: new Date('2024-04-05'), returned_at: new Date('2024-04-20') },
    
    // Current active borrowings (not returned)
    { userId: users.john.id, bookId: books[1].id, borrow_date: new Date('2024-04-15'), returned_at: null },
    { userId: users.jane.id, bookId: books[6].id, borrow_date: new Date('2024-04-18'), returned_at: null },
    { userId: users.mike.id, bookId: books[11].id, borrow_date: new Date('2024-04-20'), returned_at: null },
    { userId: users.emily.id, bookId: books[14].id, borrow_date: new Date('2024-04-22'), returned_at: null },
    { userId: users.david.id, bookId: books[23].id, borrow_date: new Date('2024-04-23'), returned_at: null },
    { userId: users.lisa.id, bookId: books[24].id, borrow_date: new Date('2024-04-24'), returned_at: null },
    { userId: users.admin.id, bookId: books[3].id, borrow_date: new Date('2024-04-25'), returned_at: null },
    { userId: users.librarian.id, bookId: books[7].id, borrow_date: new Date('2024-04-26'), returned_at: null },
  ];

  for (const borrowingData of borrowingsData) {
    await prisma.borrowings.create({ data: borrowingData });
    
    // Update book availability if not returned
    if (!borrowingData.returned_at) {
      await prisma.books.update({
        where: { id: borrowingData.bookId },
        data: { available: false }
      });
    }
  }
  console.log(`✅ Created ${borrowingsData.length} borrowing records\n`);

  // ========== DISPLAY SUMMARY ==========
  console.log('=' .repeat(50));
  console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
  console.log('=' .repeat(50));
  console.log('\n📊 DATABASE SUMMARY:');
  console.log(`   📚 Categories: ${Object.keys(categories).length}`);
  console.log(`   👥 Users: ${Object.keys(users).length}`);
  console.log(`   📖 Books: ${books.length}`);
  console.log(`   🔄 Active Borrowings: ${borrowingsData.filter(b => !b.returned_at).length}`);
  console.log(`   ✅ Total Borrowings: ${borrowingsData.length}`);
  
  console.log('\n📋 SAMPLE DATA FOR TESTING:');
  console.log(`   Admin Login: admin@library.com / admin123`);
  console.log(`   User Login: john.doe@example.com / password123`);
  console.log(`   \n   Available API Endpoints to test:`);
  console.log(`   - GET /api/books - List all books`);
  console.log(`   - GET /api/users - List all users`);
  console.log(`   - GET /api/categories - List all categories`);
  console.log(`   - GET /api/borrowings - List all borrowings`);
  console.log('\n✨ Happy coding! ✨\n');
}

main()
  .catch((e) => {
    console.error('\n❌ Error during seeding:', e);
    console.error('\n💡 Troubleshooting tips:');
    console.error('   1. Check your DATABASE_URL in .env file');
    console.error('   2. Make sure database is running');
    console.error('   3. Run "npx prisma generate" to generate Prisma Client');
    console.error('   4. Run "npx prisma migrate dev" to apply migrations');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });