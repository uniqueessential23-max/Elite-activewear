const mockData = {
    categories: [
        { id: 'shoes', name: 'Shoes', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdu1EBu2q1Lz1DkqS8aPTDfG3ixNmaVf-DrY64T7uJ9W2co7NI5CEDGCNhqM_rNI4dFPPC_QkAZXRQea2c4jZBv59MQwISD6z2zdBiUCUR1mvqWalIhZ9gZxXZAkNCBqHtdHThckpaYfAx25V6yZx7CFT2gR6Sy6x58FYtZlF7O-zkkeUUJ61OvtljBzM4LhTePqZCpheAjj38K0bdzPpd1ra35toYHvn5DyF0djGLNRhoH2bSLCKKtssoD2Z6Fs6rF_Jti-ogTmY' },
        { id: 'apparel', name: 'Apparel', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAV0F5bMT5yeG7khqbzzJzryEtV96Nt8N46vcyzXDqq0n7zf_J4eS56wOBSk9M5nFh25pbK2QgKM5LvSCvobbL0nxibe0QYUfHOVPy9jdWty926OTfQ3bxatxnmYKU3mfh_Jei5GLbnbtSa64-szLYIFuZ5ieMoTz92OHWHHY36mqj-k9VDf5IkQCgxteAx3YnDhCmBWQHrTJRh_8CXuuLmXbUMdH6HHwmFratL5Ogtm2gILVN83ggTB22T6OVipdK4eu6645yLh_s' },
        { id: 'watches', name: 'Watches', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg2zxOLjlULYgI_HNmiwjS_54PKcZPU61NrmFFiEoKWqWKo8CXMH35ooS2uhFVwv1MWIOsr1Nc_hURIWyKBt5XrJzCTeSjIJmqMZirEuT8AfQZj1F0hxr4Hpwsw973YEiBpGpSx0bVk8o8rotHNTN4kW-Zzb6V-_2HftMaOsxBMvtgKgaXpUmRr31JAmgIjk6NNSsTW4C4AWoutwv3XLHW5v2LjaQSOQ8K06IYzpE1sx8zEmOwEYNH5gXBRE3kZOl4ENRv_jnXb9w' }
    ],
    products: [
        {
            id: 1,
            name: 'V-1 PRO STEALTH HOODIE',
            category: 'apparel',
            price: 185,
            tag: 'ELITE SERIES',
            desc: 'THERMAL REGULATION TECH. Engineered for those who thrive in the dark. Experience the fusion of technical precision and elite street style.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjm0_QUrhTonEjPvofRH55AaZeoa1woOBontOi69KUkeKeG8z4XWCJmUAgy16vNeLwNilNkIDOYo5LIGeZ3PvNLnO-cWu13_yKhTS2d4SYpaXSVfatEXK-vwsJRqMBK9NXWOrYZO0CRKP2gG0yNBjLVkfg-f2hozCCaUFw4F5CdD7C11RH9lpdCwUNWW6avfPyE9gVRSD7r-4ZMQpGuAzCBhiF60tpgtxmpbzDiXOGQ9Xq5l51ZLmZNXCmZhKw5ONVrr_9eo3ltsY',
            sizes: ['S', 'M', 'L', 'XL']
        },
        {
            id: 2,
            name: 'KINETIC 2.0 TIGHTS',
            category: 'apparel',
            price: 120,
            tag: 'NEW TECH',
            desc: 'COMPRESSION + REFLECTIVE. Lightweight materials designed to minimize drag and maximize your explosive potential on every run.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSeOd1mvWQMkC5NX8ii4Q62qhyH2XuxBW94LKGCex5e_raPZjuDNJS-oo__xU0AHqpDMzYIEm6xST2OvZhzn3Qg9cnWaqDWCUNzgjXHIStA-mfZEZUrphkfZjKtXoZg4eBjbDSlJA8Xys8Uma8-etKbhsyrLm8MIOhRXAEFJvvlpapCh-2OOibrMgxQJPTli59GwuQq7nd7S9DnCxvxYzgj71XMsVqEc4VvQnngVKe2BHwafyNiBO_N-U3cHwa7shdctKLjJXbSZU',
            sizes: ['S', 'M', 'L']
        },
        {
            id: 3,
            name: 'VOLT PULSE WATCH',
            category: 'watches',
            price: 349,
            tag: 'ELITE SERIES',
            desc: 'PRECISION DATA. Integrated sensor technology tracks metrics with 99.8% medical-grade accuracy.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg2zxOLjlULYgI_HNmiwjS_54PKcZPU61NrmFFiEoKWqWKo8CXMH35ooS2uhFVwv1MWIOsr1Nc_hURIWyKBt5XrJzCTeSjIJmqMZirEuT8AfQZj1F0hxr4Hpwsw973YEiBpGpSx0bVk8o8rotHNTN4kW-Zzb6V-_2HftMaOsxBMvtgKgaXpUmRr31JAmgIjk6NNSsTW4C4AWoutwv3XLHW5v2LjaQSOQ8K06IYzpE1sx8zEmOwEYNH5gXBRE3kZOl4ENRv_jnXb9w',
            sizes: ['OS']
        },
        {
            id: 4,
            name: 'AERO-STRIKE RUNNER',
            category: 'shoes',
            price: 210,
            tag: 'PERFORMANCE',
            desc: 'INSTANT POWER. Every stitch is reinforced for durability that withstands the most grueling training sessions.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdu1EBu2q1Lz1DkqS8aPTDfG3ixNmaVf-DrY64T7uJ9W2co7NI5CEDGCNhqM_rNI4dFPPC_QkAZXRQea2c4jZBv59MQwISD6z2zdBiUCUR1mvqWalIhZ9gZxXZAkNCBqHtdHThckpaYfAx25V6yZx7CFT2gR6Sy6x58FYtZlF7O-zkkeUUJ61OvtljBzM4LhTePqZCpheAjj38K0bdzPpd1ra35toYHvn5DyF0djGLNRhoH2bSLCKKtssoD2Z6Fs6rF_Jti-ogTmY',
            sizes: ['8', '9', '10', '11', '12']
        }
    ]
};
