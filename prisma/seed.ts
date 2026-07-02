import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Mulai melakukan seeding data...');

  // 1. Buat Unit Layanan
  const unitIT = await prisma.unit.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'Pusat Komputer (IT)' },
  });

  const unitFasilitas = await prisma.unit.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Sarana & Prasarana' },
  });

  const unitAkademik = await prisma.unit.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: 'Biro Administrasi Akademik' },
  });

  // 2. Buat Kategori Pengaduan
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: 'IT & Jaringan', description: 'Masalah WiFi, SIAKAD, dll' },
  });

  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, name: 'Fasilitas & Gedung', description: 'Kerusakan AC, Kelas, Toilet' },
  });

  await prisma.category.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, name: 'Layanan Akademik', description: 'KRS, Jadwal Kuliah, Dosen' },
  });

  // 3. Buat Akun Admin Default
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@kampus.ac.id' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@kampus.ac.id',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });

  // 4. Buat Akun Pimpinan Default
  const hashedPimpinanPassword = await bcrypt.hash('pimpinan123', 10);
  await prisma.user.upsert({
    where: { email: 'pimpinan@kampus.ac.id' },
    update: {},
    create: {
      name: 'Pimpinan Universitas',
      email: 'pimpinan@kampus.ac.id',
      password: hashedPimpinanPassword,
      role: 'PIMPINAN',
    },
  });

  // 5. Buat Akun Petugas IT Default
  const hashedPetugasPassword = await bcrypt.hash('petugas123', 10);
  await prisma.user.upsert({
    where: { email: 'petugas_it@kampus.ac.id' },
    update: {},
    create: {
      name: 'Petugas IT',
      email: 'petugas_it@kampus.ac.id',
      password: hashedPetugasPassword,
      role: 'PETUGAS',
      unitId: unitIT.id
    },
  });

  console.log('Seeding data selesai! ✅');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
