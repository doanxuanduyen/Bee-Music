//search
const icon__search = document.querySelector('.icon__search');
const search__bar = document.querySelector('.search__bar');

icon__search.onclick = function(){
    search__bar.classList.toggle('active')
}

//song
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
    songs : [
        {
            number: '01',
            name: 'Bach Tuong',
            singer: 'ToodLi',
            path: './music/BachTuong-ToddLi.mp3'
        },
        {
            number: '02',
            name: 'Ben Anh Dem Nay',
            singer: 'Binz',
            path: './music/BenAnhDemNay-BinzJCHung.mp3'
        },
        {
            number: '03',
            name: 'Ca nho',
            singer: 'ToodLi',
            path: './music/CaNho-ToddLi.mp3'
        },
        {
            number: '04',
            name: 'Chang trai dang that tinh',
            singer: 'Binz',
            path: './music/ChangTraiDangThatTinh-DatGBinz.mp3'
        },
        {
            number: '05',
            name: 'DeepSea',
            singer: 'Binz',
            path: './music/DeepSea-BinzThanhNguyen.mp3'
        },
        {
            number: '06',
            name: 'Hai dam may',
            singer: 'Khoi',
            path: './music/HaiDamMay-Khoi.mp3'
        },
        {
            number: '07',
            name: 'Nguoi trong long',
            singer: 'ToodLi',
            path: './music/NguoiTrongLong-ToddLi.mp3'
        },
        {
            number: '08',
            name: 'Sao cung duoc',
            singer: 'Binz',
            path: './music/SaoCungDuoc.mp3'
        },
        {
            number: '09',
            name: 'So Far',
            singer: 'Binz',
            path: './music/SoFar-Binz.mp3'
        },
        {
            number: '10',
            name: 'Tieu Vu',
            singer: 'ToodLi',
            path: './music/TieuVuCover-ToddLi.mp3'
        }
    ],

    render: function(){
        const htmls = this.songs.map(song => {
            return `
            <div class="playList song">
                <p class="playList__number">${song.number}</p>
                <p class="playList__name">${song.name}</p>
                <p class="playList__artist">${song.singer}</p>
                <p class="playList__time"></p>
            </div>
            `
        })
        $(`.playList__play`).innerHTML = htmls.join('\n')
    },

    // getDuration(song) {
    //     return new Promise(function (resolve) {
    //     song.addEventListener("loadedmetadata", function () {
    //         const time = formatTime(song.duration);
    
    //         resolve(time);
    //         });
    //     });
    // },
    
    // formatTime: function formatTime(sec_num) {
    //     let hours = Math.floor(sec_num / 3600);
    //     let minutes = Math.floor((sec_num - hours * 3600) / 60);
    //     let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
    
    //     hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;
    
    //     if (minutes < 10) {
    //         minutes = '0' + minutes;
    //     }
    //     if (seconds < 10) {
    //         seconds = '0' + seconds;
    //     }
    //     return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    // },

    start: function() {
        this.render()
    }
}


app.start();

//trending
const trending = {
    trends : [
        {
            number: '#1',
            thumb: './resource/img/thoikhaccodon.jpg',
            name: 'Thời Khắc Cô Đơn Nhất',
            artist: 'Tood Li'
        },
        {
            number: '#2',
            thumb: './resource/img/vungdatthatlac.jpg',
            name: 'Vùng Đất Thất Lạc',
            artist: 'Tood Li'
        },
        {
            number: '#3',
            thumb: './resource/img/nguoitronglong.jpg',
            name: 'Người Trong Lòng',
            artist: 'Tood Li'
        }
    ],

    show: function(){
        const htmls = this.trends.map(trend => {
            return `
                <div class="media">
                    <div class="song__number">${trend.number}</div>
                    <div class="song__thumb" style="background-image:url('${trend.thumb}');"></div>
                    <div class="song__infor">
                        <p class="songTrend__name">${trend.name}</p>
                        <p class="songArtist__name">${trend.artist}</p>
                    </div>
                </div> 
                `
        })
        $(`.listTrend__item`).innerHTML = htmls.join('\n')
    },

    begin: function() {
        this.show()
    }
}

trending.begin();

//mode
const   navbar      = document.querySelector('.wrapper__navbar'),
        content     = document.querySelector('.content'),
        siderbar    = document.querySelector('.siderbar'),
        switch__mode= document.querySelector('.switch__mode'),
        wrapper     = document.querySelector('.wrapper')

        switch__mode.addEventListener('click', () =>{
            navbar.classList.toggle("dark");
        })
        switch__mode.addEventListener('click', () =>{
            content.classList.toggle("dark");
        })
        switch__mode.addEventListener('click', () =>{
            siderbar.classList.toggle("dark");
        })
        switch__mode.addEventListener('click', () =>{
            wrapper.classList.toggle("dark");
        })
//close navbar
const resNavbar = document.querySelector('.navbar__effect__icon'),
    container = document.querySelector('.container')

resNavbar.addEventListener('click', () =>{
    container.classList.toggle("close");
})
resNavbar.addEventListener('click', () =>{
    navbar.classList.toggle("close");
})
        

//heart
const   heartBtn = document.getElementById('heart')
        heartBtn.addEventListener('click', function() {
            if (heartBtn.className == 'far fa-heart') {
                heartBtn.className = 'fas fa-heart';
                heartBtn.style.color = 'red';
            } else {
                heartBtn.className = 'far fa-heart';
                heartBtn.style.color = '#676669';
            }
        })
        
