import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'concurso-na-veia.firebasestorage.app';

async function testCache() {
  const storagePath = `concurso-na-veia/audio-aulas-v11/portugues/aula-crase/modulo-1.mp3`;
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;
  
  const dummyBuffer = Buffer.from('dummy mp3 content');
  
  console.log(`Uploading to ${storagePath}...`);
  const uploadRes = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": "audio/mpeg" },
    body: new Uint8Array(dummyBuffer),
  });

  if (uploadRes.ok) {
    console.log(`[SUCCESS] Uploaded.`);
  } else {
    console.error(`[FAIL] Upload failed:`, uploadRes.status, await uploadRes.text());
    return;
  }

  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(storagePath)}?alt=media`;
  console.log(`Checking HEAD for ${publicUrl}...`);
  
  const headRes = await fetch(publicUrl, { method: "HEAD" });
  if (headRes.ok) {
    console.log(`[SUCCESS] Cache HIT worked! Status: ${headRes.status}`);
  } else {
    console.error(`[FAIL] Cache MISS! Status: ${headRes.status}`);
  }
}

testCache();
