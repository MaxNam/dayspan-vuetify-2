export default {
    promptLabels: {
        actionRemove: '이벤트를 삭제 하시겠습니까?',
        actionExclude: '이벤트를 제거 하시겠습니까?',
        actionCancel: '이벤트를 취소 하시겠습니까?',
        actionUncancel: '이벤트를 취소 하시겠습니까?',
        actionSetStart: '해당 이벤트를 첫 번째로 설정 하시겠습니까?',
        actionSetEnd: '해당 이벤트를 마지막으로 설정 하시겠습니까?',
        actionMove: '이벤트를 옮기시겠습니까?',
        actionInclude: '이벤트를 추가 하시겠습니까?',
        move: '이벤트를 옮기시겠습니까?',
        toggleAllDay: '해당 이벤트를 종일로 변경 하시겠습니까?',
        removeExistingTime: '현재 모든 이벤트 발생을 제거 하시겠습니까?'
    },
    placeholder: {
        noTitle: '(no title)'
    },
    patterns: {
        lastDay: (day) => '매월 마지막 날',
        lastDayOfMonth: (day) => '마지막 날 ' + day.format('MMMM'),
        lastWeekday: (day) => '마지막 ' + day.format('dddd') + ' 안 ' + day.format('MMMM')
    },
    colors: [
        {text: 'Red'},
        {text: 'Pink'},
        {text: 'Purple'},
        {text: 'Deep Purple'},
        {text: 'Indigo'},
        {text: 'Blue'},
        {text: 'Glue'},
        {text: 'Light Blue'},
        {text: 'Cyan'},
        {text: 'Teal'},
        {text: 'Green'},
        {text: 'Light Green'},
        {text: 'Lime'},
        {text: 'Yellow'},
        {text: 'Amber'},
        {text: 'Orange'},
        {text: 'Deep Orange'},
        {text: 'Brown'},
        {text: 'Blue Gray'},
        {text: 'Gray'},
        {text: 'Black'}
    ],
    icons: [
        {text: 'Alarm'},
        {text: 'Star'},
        {text: 'Love'},
        {text: 'Action'},
        {text: 'Assignment'},
        {text: 'Warning'},
        {text: 'Money'},
        {text: 'Charge'},
        {text: 'Home'},
        {text: 'Play'},
        {text: 'Email'},
        {text: 'Phone'},
        {text: 'Chart'},
        {text: 'Biking'},
        {text: 'Travel'}
    ],
    defaults: {
        dsDay: {
            formats: {
                month: 'MMM'
            }
        },
        dsCalendarApp: {
            types: [
                {label: 'Day'},
                {label: 'Week'},
                {label: 'Month'},
                {label: 'Year'},
                {label: 'Schedule'},
                {label: '4 days'}
            ],
            formats: {
                today: 'MMMM D dddd',
                xs: 'MMM'
            },
            labels: {
                next: (type) => type ? '다음 ' + type.label.toLowerCase() : '다음',
                prev: (type) => type ? '이전 ' + type.label.toLowerCase() : '이전',
                moveCancel: '이동 취소',
                moveSingleEvent: '이벤트 이동',
                moveOccurrence: '이 이벤트 발생 만 이동',
                moveAll: '모든 이벤트 발생 이동',
                moveDuplicate: '이벤트 발생 추가',
                promptConfirm: '예',
                promptCancel: '아니오',
                today: '오늘'
            }
        },
        dsAgendaEvent: {
            formats: {
                firstLine: 'ddd',
                secondLine: 'MMM Do',
                start: 'MMMM D dddd',
                time: 'h:mm a'
            },
            labels: {
                allDay: '종일',
                options: 'Options',
                close: '닫기',
                day: ['일', '일'],
                days: ['일', '일'],
                minute: ['분', '분'],
                minutes: ['분', '분'],
                hour: ['시', '시'],
                hours: ['시', '시'],
                week: ['주', '주'],
                weeks: ['주', '주'],
                second: ['초', '초'],
                seconds: ['초', '초'],
                busy: 'Busy',
                free: 'Free'
            }
        },
        dsCalendarEventChip: {
            formats: {
                fullDay: 'YYYY MMM Do ddd',
                timed: 'YYYY MMM Do ddd'
            }
        },
        dsCalendarEventPopover: {
            formats: {
                start: 'MMMM D dddd',
                time: 'h:mm a'
            },
            labels: {
                allDay: '종일',
                options: 'Options',
                close: '닫기',
                day: ['일', '일'],
                days: ['일', '일'],
                minute: ['분', '분'],
                minutes: ['분', '분'],
                hour: ['시', '시'],
                hours: ['시', '시'],
                week: ['주', '주'],
                weeks: ['주', '주'],
                second: ['초', '초'],
                seconds: ['초', '초'],
                busy: 'Busy',
                free: 'Free'
            }
        },
        dsCalendarEventCreatePopover: {
            formats: {
                start: 'MMMM D dddd',
                time: 'h:mm a'
            },
            labels: {
                title: '제목',
                allDay: '종일',
                close: '닫기',
                save: '저장',
                day: ['일', '일'],
                days: ['일', '일'],
                minute: ['분', '분'],
                minutes: ['분', '분'],
                hour: ['시', '시'],
                hours: ['시', '시'],
                week: ['주', '주'],
                weeks: ['주', '주'],
                second: ['초', '초'],
                seconds: ['초', '초'],
                busy: 'Busy',
                free: 'Free',
                description: '메모를 입력하세요',
                calendar: '달력',
                location: '장소',
                phone: '휴대폰 번호를 입력하세요',
                guests: '이름',
                notice: '알림'
            },
            // busyOptions: [
            //     {text: 'Busy'},
            //     {text: 'Free'}
            // ],
            notifyTimeOptions: [
                {text: '10분 전'},
                {text: '30분 전'},
                {text: '1시간 전'}
            ],
            notifyHowOptions: [
                {text: '푸시'},
                {text: '메일'}
            ],
            showOptions: [
                {text: '공개'},
                {text: '비공개'}
            ]
        },
        dsSchedule: {
            labels: {
                editCustom: '수정'
            }
        },
        dsEvent: {
            labels: {
                moreActions: '더 많은 행동...',
                remove: '삭제',
                cancel: '취소',
                save: '저장',
                title: '제목',
                exclusions: '이는 일반적으로 발생하는 이벤트가 스케줄에서 제외 된 이벤트 또는 시간 범위입니다. 이벤트 발생이 이동하면 여기에서 이벤트가 제외됩니다.',
                inclusions: '이벤트가 정상적으로 발생하는 일정을 벗어난 이벤트 또는 시간 범위입니다. 이벤트 발생이 이동하면 여기에 이벤트가 추가됩니다.',
                cancelled: '이는 이벤트가 취소 된 이벤트 또는 시간 범위입니다.',
                edit: '이벤트 수정',
                add: '이벤트 추가',
                description: '메모를 입력하세요',
                calendar: '달력',
                tabs: {
                    details: '이벤트 상세보기',
                    forecast: '예보',
                    removed: '삭제됨',
                    added: '추가됨',
                    cancelled: '취소됨'
                }
            },
            // busyOptions: [
            //     {text: 'Busy'},
            //     {text: 'Free'}
            // ],
            notifyTimeOptions: [
                {text: '10분 전'},
                {text: '30분 전'},
                {text: '1시간 전'}
            ],
            notifyHowOptions: [
                {text: '푸시'},
                {text: '메일'}
            ],
            showOptions: [
                {text: '공개'},
                {text: '비공개'}
            ]
        },
        dsScheduleActions: {
            labels: {
                remove: '이벤트를 제거',
                exclude: '해당 이벤트를 제거',
                cancel: '해당 이벤트를 제거',
                uncancel: '해당 이벤트를 취소',
                move: '해당 이벤트를 이동',
                include: '새로운 이벤트 추가',
                setStart: '첫번째 이벤트로 설정',
                setEnd: '마지막 이벤트로 설정',
                pickerOk: '예',
                pickerCancel: '취소'
            }
        },
        dsScheduleForecast: {
            labels: {
                prefix: '예측은 이전 및 다음을 보여줍니다.',
                suffix: '몇 년 내에 발생한 사건.'
            }
        },
        dsScheduleFrequencyDay: {
            labels: {
                type: '일'
            },
            options: [
                {text: '모든 일'},
                {text: '다음 날에 ...'},
                {text: '_부터 시작하는 _ 일마다'}
            ],
            types: [
                {text: '이달의 날'},
                {text: '매월 마지막 날'},
                {text: '올해의 날'}
            ]
        },
        dsScheduleFrequencyDayOfWeek: {
            weekdays: ['일요일', '월요일', '화요일', '슈요일', '목요일', '금요일', '토요일'],
            labels: {
                type: '요일'
            },
            options: [
                {text: '요일'},
                {text: '다음 요일에...'},
                {text: '_ 평일 _부터 매주 시작'},
                {text: '주말'},
                {text: '평일'}
            ]
        },
        dsScheduleFrequencyMonth: {
            labels: {
                type: '개월'
            },
            months: [
                '1월',
                '2월',
                '3월',
                '4월',
                '5월',
                '6월',
                '7월',
                '8월',
                '9월',
                '10월',
                '11월',
                '12월'
            ],
            options: [
                {text: '어떤 달'},
                {text: '다음 달에'},
                {text: '_에 시작하는 _ 개월마다'}
            ]
        },

        dsScheduleFrequencyWeek: {
            labels: {
                type: '주'
            },
            options: [
                {text: '매주'},
                {text: '다음 주에 ...'},
                {text: '_부터 시작하는 _ 주마다'}
            ],
            types: [
                {text: '매월 주 (첫 번째 주에는 목요일이 있습니다)'},
                {text: '매월 주중 (매월 첫째 날에 시작)'},
                {text: '해당 월의 전체 주 (0 일 =있는 경우 전 주)'},
                {text: '매월 마지막 주 (마지막 날에 시작)'},
                {text: '매월 마지막 주 전체 (0 일 =있는 경우 주 후)'},
                {text: '연중 주 (첫 번째 주에는 목요일이 있습니다)'},
                {text: '연중 주 (연중 첫날에 시작)'},
                {text: '연중 전체 주 (0 일 =있는 경우 전 주)'},
                {text: '연중 마지막 주 (연말 일에 시작)'},
                {text: '연중 마지막 주 (연말 일에 시작)'}
            ]
        },

        dsScheduleFrequencyYear: {
            labels: {
                type: '연'
            },
            options: [
                {text: '매년'},
                {text: '다음 해에 ...'},
                {text: '_부터 시작하는 _ 년마다'}
            ]
        },

        dsScheduleSpan: {
            labels: {
                startless: '시작 시간',
                endless: '끝나는 시간'
            },
            formats: {
                start: 'YYYY MMMM Do',
                end: 'YYYY MMMM Do'
            }
        },

        dsScheduleTime: {
            labels: {
                remove: '시간 삭제',
                add: '시간 추가'
            }
        },

        dsScheduleTimes: {
            labels: {
                all: '종일',
                minute: '분',
                minutes: '분',
                hour: '시',
                hours: '시',
                day: '일',
                days: '일',
                week: '주',
                weeks: '주',
                month: '월',
                months: '월',
                second: '초',
                seconds: '초'
            }
        },

        dsScheduleType: {
            formats: {
                date: 'LL'
            }
        },

        dsScheduleTypeCustomDialog: {
            labels: {
                save: '저장',
                cancel: '취소'
            }
        },

        dsWeekDayHeader: {
            formats: {
                weekday: 'ddd'
            }
        },

        dsWeeksView: {
            weekdays: ['일', '월', '화', '수', '목', '금', '토']
        },

        dsDaysView: {
            hours: [
                '    ', '오전 1시', '오전 2시', '오전 3시', '오전 4시', '오전 5시', '오전 6시', '오전 7시', '오전 8시', '오전 9시', '오전 10시', '오전 11시',
                '오후 12시', '오후 1시', '오후 2시', '오후 3시', '오후 4시', '오후 5시', '오후 6시', '오후 7시', '오후 8시', '오후 9시', '오후 10시', '오후 11시'
            ]
        },

        dsDayPicker: {
            weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            labels: {
                prevMonth: '이전 달',
                nextMonth: '다음 달'
            }
        }
    }
}
