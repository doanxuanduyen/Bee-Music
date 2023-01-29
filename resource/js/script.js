//search
const icon__search = document.querySelector('.icon__search');
const search__bar = document.querySelector('.search__bar');

icon__search.onclick = function(){
    search__bar.classList.toggle('active')
}

//song
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const nameSong = $('.playSong__title')
const audio = $('#audio')
const source = $('#source')
let isPlay = false;
const nextBtn = $('.play-forward');
const backBtn = $('.play-backward');
const repeatBtn = $('.play-repeat');
const playlist = $('.playList__play');
const playBtn = $('#btn--play')

const app = {
    currentIndex : 0,
    songs : [
        {
            number: '01',
            name: 'Bach Tuong',
            singer: 'ToodLi',
            path: './resource/music/BachTuong-ToddLi.mp3'
        },
        {
            number: '02',
            name: 'Ben Anh Dem Nay',
            singer: 'Binz',
            path: './resource/music/BenAnhDemNay-BinzJCHung.mp3'
        },
        {
            number: '03',
            name: 'Ca nho',
            singer: 'ToodLi',
            path: './resource/music/CaNho-ToddLi.mp3'
        },
        {
            number: '04',
            name: 'Chang trai dang that tinh',
            singer: 'Binz',
            path: './resource/music/ChangTraiDangThatTinh-DatGBinz.mp3'
        },
        {
            number: '05',
            name: 'DeepSea',
            singer: 'Binz',
            path: './resource/music/DeepSea-BinzThanhNguyen.mp3'
        },
        {
            number: '06',
            name: 'Hai dam may',
            singer: 'Khoi',
            path: './resource/music/HaiDamMay-Khoi.mp3'
        },
        {
            number: '07',
            name: 'Nguoi trong long',
            singer: 'ToodLi',
            path: './resource/music/NguoiTrongLong-ToddLi.mp3'
        },
        {
            number: '08',
            name: 'Sao cung duoc',
            singer: 'Binz',
            path: './resource/music/SaoCungDuoc.mp3'
        },
        {
            number: '09',
            name: 'So Far',
            singer: 'Binz',
            path: './resource/music/SoFar-Binz.mp3'
        },
        {
            number: '10',
            name: 'Tieu Vu',
            singer: 'ToodLi',
            path: './resource/music/TieuVuCover-ToddLi.mp3'
        }
    ],
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function(){
        nameSong.textContent = this.currentSong.name;
        source.src = this.currentSong.path;
    },
    render: function(){
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="playList song ${index === this.currentIndex ? "active" : ""}" data-index = ${index} >
                <p class="playList__number">${song.number}</p>
                <p class="playList__name">${song.name}</p>
                <p class="playList__artist">${song.singer}</p>
                <p class="playList__more"><i class="fa-solid fa-ellipsis"></i></p>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('\n')
    },
    handleEvent: function(){
        _this = this;
        // playing

        playBtn.addEventListener('click', function(){
            if(isPlay == false){
                audio.play();
            }
            else{
                audio.pause();
            }
        })

        // khi song dc play
        audio.onplay = function(){
            playBtn.classList.remove('fa-play-circle');
            playBtn.classList.add('fa-pause-circle');
            isPlay = true;
        }

        // khi song pause
        audio.onpause = function(){
            playBtn.classList.remove('fa-pause-circle');
            playBtn.classList.add('fa-play-circle');
            isPlay = false;
        }

        // click playlist chon bai
        playlist.onclick = function (e){
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode){
                _this.currentIndex = Number(songNode.dataset.index);
                _this.loadCurrentSong();
                _this.render();
                audio.play();
            }
        }
        

        // next bai hat
        nextBtn.onclick = function(){
            _this.nextSong();
            audio.play();
            _this.render();
        }

        // back bai hat
        backBtn.onclick = function(){
            _this.backSong();
            audio.play();
            _this.render();
        }

        // tu dong chuyen bai
        audio.addEventListener('ended', function(){
            _this.nextSong();
            audio.play();
            _this.render();
        })

        // quay lai tu dau
        repeatBtn.addEventListener('click', function(){
            audio.currentTime = 0;
            audio.play();
        })

    },

    backSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    nextSong: function () {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong();
        audio.play();
    },

    displayTimer: function(){
        setInterval(this.displayTimer, 500);
        function formatTimer(number){
            const minutes = Math.floor(number/60);
            const seconds = Math.floor(number - minutes*60);
            return `${minutes}:${seconds}`;
        }

        const remaningTime = $('.current-time');
        const durationTime = $('.duration-time')
        const {duration, currentTime} = audio;

        // dieu khien thanh range
        const rangeBar = $('.range')
        rangeBar.max = duration;
        rangeBar.value = currentTime;
        rangeBar.addEventListener('change', function(){
            audio.currentTime = rangeBar.value;
        })

        remaningTime.textContent = formatTimer(currentTime);
        if(!duration){
            durationTime.textContent = "00:00";
        }
        else{
            durationTime.textContent = formatTimer(duration);
        }
    },

    changeVolume: function(){
        const volumnButton = $('.volumn__input');
        const volumnProgress = $(".volumn__progress");
        const volumnValue = $(".sliderValue");

        volumnButton.oninput = function(){
            volumnProgress.value = volumnButton.value;
            volumnValue.innerHTML = volumnButton.value;
            audio.volume = (volumnButton.value)/100;
        }
        
    },

    start: function() {
        // xu ly volume
        this.changeVolume()

        // dinh nghia thuoc tinh object
        this.defineProperties()

        // tai thong tin bai hat dau tien
        this.loadCurrentSong()

        // xu ly xu kien
        this.handleEvent()

        // hien thi thoi gian
        this.displayTimer()

        // render bai hat
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
        container.classList.toggle("open");
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

