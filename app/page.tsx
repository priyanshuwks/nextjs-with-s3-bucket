import Image from "next/image";
import { onSubmit } from "./action";

export default function Home() {
  return ( 
    <div>
      <h3>Upload files below:</h3>
      <form action={onSubmit}>
        <input type="file" name="file"
          className="mt-1 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <input type="submit" value="upload" 
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        <button type="submit" 
          className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            Upload </button>
      </form>
    </div>
  );
}
