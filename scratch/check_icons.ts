
import * as LuIcons from 'react-icons/lu';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';

const icons = [
  'LuImage', 'LuPlay', 'LuBookOpen', 'LuVolume2', 'LuShuffle', 'LuCheck',
  'LuCirclePlay', 'LuBrain', 'LuMusic', 'LuPaperclip', 'LuTriangleAlert',
  'LuScale', 'LuClock', 'LuShieldAlert'
];

icons.forEach(icon => {
  if (!(LuIcons as any)[icon]) {
    console.log(`Icon ${icon} NOT found in react-icons/lu`);
  } else {
    console.log(`Icon ${icon} found.`);
  }
});
