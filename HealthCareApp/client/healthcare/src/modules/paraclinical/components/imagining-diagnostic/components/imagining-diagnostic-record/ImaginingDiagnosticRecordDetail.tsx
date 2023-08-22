import React, { useEffect, useState } from 'react'
import { Image, Space } from 'antd';
import { IImaginingDiagnosticImage } from '../../../../models';

export const ImaginingDiagnosticRecordDetail = (props: any) => {
    const [url, setUrl] = useState<IImaginingDiagnosticImage[]>([]);

    useEffect(() => {
        setUrl(props.record);
    }, [props])

  return (
    <>
        <Space size={[8, 10]} wrap>
            {url.map((image, i) => 
                <div key={i}>
                    <Image
                        width={200}
                        src={image.imageUrl}
                    />
                </div>
            )}
        </Space>
    </>
  )
}
