import { FileText } from 'lucide-react';
import React from 'react';

const BlockCardWidget = () => {
    return (
        <div className='mt-3 lg:mt-4    '>
            <div className="grid grid-cols-12 gap-3 lg:gap-4">
                <div className="col-span-12 lg:col-span-4">
                    <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  p-4 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-4">
                            <div className="icon text-primaryColor flex items-center justify-center w-[50px] h-[50px] bg-[#782efa45]  rounded-lg ">
                                <FileText className="lg:w-7 lg:h-7"></FileText>
                            </div>
                            <div>
                                <p className="text-colorMuted text-sm mb-1">Total</p>
                                <h4 className="text-colorTitle font-semibold lg:text-[22px]">
                                    40
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockCardWidget;
