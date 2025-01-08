"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { FaUserCog } from 'react-icons/fa';

const UserSetting = () => {
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ location, age, gender, bio });
    router.push("/profile");
  };

  return (
    <div>
      <h1 className="text-gray-900 font-bold mb-4">プロフィールの編集</h1>
      <form onSubmit={handleSubmit}>

        <div className="flex flex-col border-t pt-4 pb-4 gap-1.5">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">名前</label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="名前"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col border-t pt-4 pb-4 gap-1.5">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">自己紹介</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="プロフィールに自己紹介を追加する"
            rows={4}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="flex flex-col border-t pt-4 pb-4 gap-1.5">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">場所</label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="場所"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
  
        <div className="flex flex-col border-t pt-4 pb-4 gap-1.5">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">生年月日</label>
          <Input
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="生年月日"
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
  
        <div className="flex flex-col border-t pt-4 pb-4 gap-1.5">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">性別</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>
  
        <div className="flex flex-row-reverse border-t pt-4 pb-4 gap-1.5">
          <Button type="submit" className="w-full">
            保存する
          </Button>        
        </div>
      </form>
    </div>
  );
}

export const LoginButton = () => {
    return(
        <div>
            <SignedIn>
                <UserButton>
                    <UserButton.UserProfilePage label="ユーザー情報" url="user" labelIcon={<FaUserCog />}>
                        <UserSetting />                
                    </UserButton.UserProfilePage>
                    <UserButton.UserProfilePage label="account" />
                    <UserButton.UserProfilePage label="security" />
                </UserButton>
            </SignedIn>            
                <SignedOut>
                    <Button><Link href={"/sign-in"} className="w-20 inline-block">ログイン</Link></Button>
                </SignedOut>            
        </div>
    );
}