'use client';

import IdChat from '@/components/IdChat';

type Props = {
    params : {
       id : string
    }
}

function page( { params : { id } }: Props ) {
  return (
    <div>
      <IdChat id={id} />
    </div>
  )
}

export default page