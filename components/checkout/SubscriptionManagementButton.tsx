"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const SubscriptionManagementButton = () => {
    const router = useRouter();

    const loadPortal = async () =>{
        const res = await fetch(`${location.origin}/api/portal`);
        const data = await res.json();
        router.push(data.url)
    };

  return (
    <div>
        <Button onClick={loadPortal}>サブスクリプション管理</Button>
    </div>
  )
}

export default SubscriptionManagementButton