import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'concurso-na-veia.firebasestorage.app';

async function testUpload(prefix) {
  const storagePath = `${prefix}/test-audio-cache-${Date.now()}.mp3`;
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(storagePath)}`;
  
  const dummyBuffer = Buffer.from('test audio buffer');
  
  console.log(`Testing upload to ${storagePath}...`);
  try {
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": "audio/mpeg" },
      body: new Uint8Array(dummyBuffer),
    });

    if (uploadRes.ok) {
      console.log(`[SUCCESS] Upload to ${prefix} succeeded!`);
    } else {
      const errText = await uploadRes.text();
      console.error(`[FAIL] Upload to ${prefix} failed with status:`, uploadRes.status, errText);
    }
  } catch (err) {
    console.error(`[ERROR] Exception uploading to ${prefix}:`, err.message);
  }
}

async function main() {
  await testUpload('wp2next');
  await testUpload('concurso-na-veia');
}

main();
