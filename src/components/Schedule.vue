<template>

    <div class="ds-schedule"
         :class="classes">

        <div class="ds-schedule-span">

            <!-- Span -->
            <!-- <slot name="scheduleSpan" v-bind="{schedule, day}">

                <ds-schedule-span
                    :schedule="schedule"
                    :day="day"
                    :read-only="readOnly"
                ></ds-schedule-span>

            </slot> -->

        </div>

        <p class="duration-date">{{displayDay}}  ~  {{displayEndDay}}</p>

        <v-layout row wrap>

            <v-flex xs12>

                <!-- Times -->
                <slot name="scheduleTimes" v-bind="{schedule, day}">

                    <ds-schedule-times
                            :schedule="schedule"
                            :read-only="readOnly"
                    ></ds-schedule-times>

                </slot>

            </v-flex>
            <v-flex xs12 v-if="!isReadOnly">

                <slot name="scheduleFooter" v-bind="{schedule, day}"></slot>

                <!-- Custom -->
                <ds-schedule-type-custom-dialog
                        v-bind="{$scopedSlots}"
                        ref="customScheduler"
                ></ds-schedule-type-custom-dialog>

            </v-flex>
        </v-layout>

    </div>
</template>

<script>
import { Day, Schedule, Functions as fn } from 'dayspan'
import * as moment from 'moment'

export default {

    name: 'dsSchedule',

    props:
        {
            schedule:
                {
                    required: true,
                    type: Schedule
                },

            day:
                {
                    type: Day
                },

            readOnly:
                {
                    type: Boolean,
                    default: false
                },

            labels:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'labels')
                    },
                    default () {
                        return this.$dsDefaults().labels
                    }
                },

            allowsRange:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().allowsRange
                    }
                }
        },

    data: vm => ({}),

    computed:
        {
            showRange () {
                return this.allowsRange && !this.schedule.isSingleEvent()
            },

            classes () {
                return {
                    'ds-schedule-small': this.$vuetify.breakpoint.smAndDown
                }
            },

            isReadOnly () {
                return this.readOnly || this.$dayspan.readOnly
            },
            currentDay () {
                let { times } = this.schedule
                let { hour, minute, seconds } = this.day
                let time = times[0]
                return moment(this.day.time).add(time.hour - hour, 'hours').add(time.second - seconds, 'seconds').add(time.minute - minute, 'minutes')
            },
            displayDay () {
                let { times } = this.schedule
                let { hour, minute, seconds } = this.day
                let time = times[0]
                if (hour === time.hour && minute === time.minute && seconds === time.second) {
                    return moment(this.day.time).format('YYYY년 MM월 DD일 a h:mm')
                }
                return this.currentDay.format('YYYY년 MM월 DD일 a h:mm')
            },
            displayEndDay () {
                let { duration, durationUnit } = this.schedule
                return this.currentDay.add(duration, durationUnit).format('YYYY년 MM월 DD일 a h:mm')
            }
        },

    methods:
        {
            custom () {
                this.$refs.customScheduler.edit(this.schedule, this.day)
            },

            setType (type) {
                this.$emit('type', type)
            }
        }
}
</script>

<style lang="scss">

    .ds-schedule {

        .ds-schedule-type {
            max-width: 436px;
            padding-right: 8px;
        }

        &.ds-schedule-small {

            .ds-schedule-type {
                width: 100%;
            }
        }

    }

</style>
