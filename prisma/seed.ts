import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {


    const business = await prisma.business.create({
        data: {
          name: 'My New Business',
        },
      })


      const data = [];
  
      for(let i = 0; i < 10; i++) {
        data.push({
          name: `My New Contact ${i + 1}`,
          mobile: `123456789${i}`, // make sure this is a valid phone number in your context
          note: `Some notes about the contact ${i + 1}`,
          businessId: business.id,
        
        });
      }
  const newContacts = await prisma.contact.createMany({
    data,
  });

      }

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })