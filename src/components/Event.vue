<template>

    <div class="ds-event"
         :class="classes">

        <!-- Details -->
        <v-card flat>
            <v-card-title>
                일정등록
                <v-spacer></v-spacer>
                <!-- Save -->
                <slot name="scheduleSave" v-if="!isReadOnly" v-bind="{hasSave, save, labels, readOnly}">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon class="ds-button" @click="save">
                                <v-icon dark>fas fa-save</v-icon>
                            </v-btn>
                        </template>
                        <span v-html="labels.save"></span>
                    </v-tooltip>

                </slot>

                <!-- Remove -->
                <slot name="scheduleRemove" v-if="calendarEvent && !isReadOnly" v-bind="{remove, labels}">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon class="ds-button" @click="remove">
                                <v-icon dark>fas fa-trash-alt</v-icon>
                            </v-btn>
                        </template>
                        <span v-html="labels.remove"></span>
                    </v-tooltip>

                </slot>

                <!-- Cancel -->
                <slot name="scheduleCancel" v-if="hasCancel" v-bind="{cancel, labels}">

                    <v-tooltip bottom>

                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" icon class="ds-button" @click="cancel">
                                <v-icon dark>fas fa-times</v-icon>
                            </v-btn>
                        </template>
                        <span v-html="labels.cancel"></span>
                    </v-tooltip>

                </slot>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>

                <!-- Title -->
                <slot name="scheduleTitle" v-bind="{schedule, schedule, calendarEvent, details}">
                    <v-row v-if="$dayspan.supports.title">
                      <v-col cols="2">
                        <v-subheader class="ds-subheader">제목</v-subheader>
                      </v-col>
                      <v-col cols="10">
                        <v-text-field
                          loader-height="1"
                          single-line hide-details filled
                          :readonly="isReadOnly"
                          v-model="details.title"
                          class="ds-input"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                </slot>

                <!-- Schedule -->
                <slot name="schedule" v-bind="slotData">
                    <v-row v-if="$dayspan.supports.title">
                      <v-col cols="2">
                        <v-subheader class="ds-subheader">계약 기간</v-subheader>
                      </v-col>
                      <v-col cols="10">
                        <ds-schedule
                          :schedule="schedule"
                          :day="day"
                          :read-only="readOnly"
                        ></ds-schedule>
                      </v-col>
                    </v-row>
                </slot>

                <!-- Guests -->
                <slot name="eventDetailsGuests" v-bind="slotData">
                    <v-row v-if="$dayspan.supports.guests">
                      <v-col cols="2">
                        <v-subheader class="ds-subheader">참석자</v-subheader>
                      </v-col>
                      <v-col cols="10">
                        <v-text-field
                          single-line hide-details filled
                          :readonly="isReadOnly"
                          v-model="details.guests"
                          class="ds-input"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                </slot>

                <!-- Location -->
                <slot name="eventDetailsLocation" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.location">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">장소</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        single-line hide-details filled
                        :readonly="isReadOnly"
                        v-model="details.location"
                        class="ds-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Phone -->
                <slot name="eventDetailsPhone" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.phone">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">연락처</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        single-line hide-details filled
                        :readonly="isReadOnly"
                        v-mask="'###-####-####'"
                        v-model="details.phone"
                        class="ds-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Description -->
                <slot name="eventDetailsDescription" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.description">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">메모</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-textarea
                        single-line hide-details filled
                        :readonly="isReadOnly"
                        v-model="details.description"
                        class="ds-input"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Calendar -->
                <slot name="eventDetailsCalendar" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.calendar">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">캘린더</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-text-field
                        single-line hide-details filled
                        :readonly="isReadOnly"
                        v-model="details.calendar"
                        class="ds-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Color -->
                <slot name="eventDetailsColor" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.color">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">색상</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-select
                        single-line hide-details filled
                        :items="$dayspan.colors"
                        :color="details.color"
                        :disabled="isReadOnly"
                        v-model="details.color"
                        class="ds-input"
                      >
                        <template slot="item" slot-scope="{ item }">
                          <v-list-item-content>
                              <div class="ds-color-option" :style="{backgroundColor: item.value}" v-text="item.text"></div>
                          </v-list-item-content>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Notify -->
                <slot name="eventDetailsNotify" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.notifyTime && $dayspan.supports.notifyHow">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">알림</v-subheader>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        single-line hide-details filled
                        :items="notifyTimeOptions"
                        :disabled="isReadOnly"
                        v-model="details.notifyTime"
                        class="ds-input"
                      ></v-select>
                    </v-col>
                    <v-col cols="5">
                        <v-radio-group class="ds-radio-group" v-model="details.notifyHow" row>
                            <v-radio 
                                v-for="(option, idx) in notifyHowOptions"
                                :key="idx"
                                color="primary"
                                :label="option.text" 
                                :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Show -->
                <slot name="eventDetailsShow" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.show && $dayspan.supports.show">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">공개</v-subheader>
                    </v-col>
                    <v-col cols="10">
                        <v-radio-group class="ds-radio-group" v-model="details.show" row>
                            <v-radio 
                                v-for="(option, idx) in showOptions"
                                :key="idx"
                                color="primary"
                                :label="option.text" 
                                :value="option.value"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                  </v-row>
                </slot>

                <!-- Busy -->
                <!-- <slot name="eventDetailsBusy" v-bind="slotData">
                  <v-row v-if="$dayspan.supports.busy">
                    <v-col cols="2">
                      <v-subheader class="ds-subheader">공개</v-subheader>
                    </v-col>
                    <v-col cols="10">
                      <v-select
                        single-line hide-details filled
                        :items="busyOptions"
                        :disabled="isReadOnly"
                        v-model="details.busy"
                        class="ds-input"
                      ></v-select>
                    </v-col>
                  </v-row>
                </slot> -->

                <slot name="eventDetailsExtra" v-bind="slotData"></slot>

            </v-card-text>
        </v-card>

    </div>

</template>

<script>
import { Day, Calendar, CalendarEvent, Schedule, Functions as fn } from 'dayspan'

export default {

    name: 'dsEvent',

    props:
        {
            targetSchedule:
                {
                    required: true,
                    type: Schedule
                },

            targetDetails:
                {
                    type: Object,
                    required: true
                },

            calendarEvent:
                {
                    type: CalendarEvent
                },

            calendar:
                {
                    type: Calendar
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

            hasTitle:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasTitle
                    }
                },

            hasCancel:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasCancel
                    }
                },

            hasSave:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasSave
                    }
                },

            hasTabs:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasTabs
                    }
                },

            hasDetails:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasDetails
                    }
                },

            hasForecast:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasForecast
                    }
                },

            hasExclusions:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasExclusions
                    }
                },

            hasInclusions:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasInclusions
                    }
                },

            hasCancelled:
                {
                    type: Boolean,
                    default () {
                        return this.$dsDefaults().hasCancelled
                    }
                },
            notifyTimeOptions:
                {
                    type: Array,
                    default () {
                        return this.$dsDefaults().notifyTimeOptions
                    }
                },
            notifyHowOptions:
                {
                    type: Array,
                    default () {
                        return this.$dsDefaults().notifyHowOptions
                    }
                },
            showOptions:
                {
                    type: Array,
                    default () {
                        return this.$dsDefaults().showOptions
                    }
                },
            busyOptions:
                {
                    type: Array,
                    default () {
                        return this.$dsDefaults().busyOptions
                    }
                }
        },

    data: vm => ({
        tab: 'details',
        schedule: new Schedule(),
        details: vm.$dayspan.getDefaultEventDetails()
    }),

    watch:
        {
            targetSchedule:
                {
                    handler: 'updateSchedule',
                    immediate: true
                },

            targetDetails:
                {
                    handler: 'updateDetails',
                    immediate: true
                }
        },

    computed:
        {
            slotData () {
                return {
                    targetSchedule: this.targetSchedule,
                    targetDetails: this.targetDetails,
                    schedule: this.schedule,
                    details: this.details,
                    notifyTimeOptions: this.notifyTimeOptions,
                    notifyHowOptions: this.notifyHowOptions,
                    busyOptions: this.busyOptions,
                    showOptions: this.showOptions,
                    day: this.day,
                    calendar: this.calendar,
                    calendarEvent: this.calendarEvent,
                    labels: this.labels,
                    readOnly: this.readOnly
                }
            },

            event () {
                return this.calendarEvent.event
            },

            classes () {
                return {
                    'ds-has-cancel': this.hasCancel,
                    'ds-event-small': this.$vuetify.breakpoint.smAndDown
                }
            },

            canSave () {
                return this.$dayspan.isValidEvent(this.details, this.schedule, this.calenderEvent)
            },

            repeats () {
                return !this.schedule.isSingleEvent()
            },

            showTitle () {
                return this.$dayspan.supports.title &&
                    this.hasTitle
            },

            showCancels () {
                return this.$dayspan.features.cancel &&
                    this.repeats &&
                    this.hasCancelled &&
                    !this.schedule.cancel.isEmpty()
            },

            showForecast () {
                return this.$dayspan.features.forecast &&
                    this.repeats &&
                    this.hasForecast
            },

            showExclusions () {
                return this.$dayspan.features.exclude &&
                    this.repeats &&
                    this.hasExclusions &&
                    !this.schedule.exclude.isEmpty()
            },

            showInclusions () {
                return this.$dayspan.features.include &&
                    this.repeats &&
                    this.hasInclusions &&
                    !this.schedule.include.isEmpty()
            },

            isReadOnly () {
                return this.readOnly || this.$dayspan.readOnly
            }
        },

    methods:
        {
            save () {
                var ev = this.getEvent('save')

                this.$emit('save', ev)

                if (!ev.handled) {
                    if (ev.target && ev.schedule) {
                        ev.target.set(ev.schedule)
                    }

                    if (ev.calendarEvent) {
                        this.$dayspan.setEventDetails(
                            ev.details,
                            ev.targetDetails,
                            ev.calendarEvent.event,
                            ev.calendarEvent
                        )

                        this.$emit('update', ev)

                        this.$emit('event-update', ev.calendarEvent.event)
                    } else if (ev.create) {
                        ev.created = this.$dayspan.createEvent(ev.details, ev.schedule)

                        if (ev.calendar) {
                            ev.calendar.addEvent(ev.created)
                            ev.added = true
                        }

                        this.$emit('create', ev)
                    }

                    if (ev.calendar && ev.refresh) {
                        ev.calendar.refreshEvents()
                    }

                    ev.handled = true

                    if (ev.created) {
                        this.$emit('event-create', ev.created)
                    }
                }

                this.$emit('saved', ev)
            },

            actioned (ev) {
                this.$emit('actioned', ev)
            },

            cancel () {
                this.$emit('cancel', this.getEvent('cancel'))
            },

            updateSchedule (schedule) {
                this.schedule = schedule.clone()
                this.tab = 'details'
            },

            updateDetails (details) {
                this.details = this.$dayspan.copyEventDetails(details)
                this.tab = 'details'
            },

            getEvent (type, extra = {}) {
                return fn.extend({

                    type: type,
                    day: this.day,
                    schedule: this.schedule,
                    target: this.targetSchedule,
                    details: this.details,
                    targetDetails: this.targetDetails,
                    calendar: this.calendar,
                    calendarEvent: this.calendarEvent,
                    event: this.calendarEvent && this.event,
                    handled: false,
                    refresh: true,
                    create: true,
                    added: false,
                    $vm: this,
                    $element: this.$el

                }, extra)
            },
            remove () {
                this.$dayspan.getPermission('actionRemove', () => {
                    var ev = this.getEvent('remove')

                    this.$emit('remove', ev)

                    if (!ev.handled && ev.calendar) {
                        ev.calendar.removeEvent(ev.event)
                        ev.handled = true
                    }
                    this.actioned(ev)

                    this.$emit('event-remove', ev.event)
                })
            }

        }
}
</script>

<style scoped lang="scss">

    .ds-calendar-event-title {
        font-size: 18px;
        padding-right: 8px;
        padding-top: 4px;
    }

    .ds-color-option {
        width: 100%;
        color: white;
        padding: 4px;
    }

    .ds-button {
        margin-left: 10px;
    }

    .ds-button-tall {
        height: 48px;
    }

    .ds-event {

        &.ds-has-cancel {

            .ds-event-area {
                margin-left: 60px;
            }
        }

        &.ds-event-small {

            &.ds-has-cancel {

                .ds-event-area {
                    margin-left: 0px;
                }

                .ds-event-header {
                    margin-left: 60px;
                    margin-bottom: 58px;
                }
            }

            .ds-event-title {
                position: absolute;
                right: 8px;
                left: -60px;
                top: 60px;
            }

            .ds-event-body {
                clear: both;
            }
        }

        .ds-event-area {
            position: relative;
        }

        .ds-event-actions {
            float: right;

            > * {
                display: inline-block;
            }
        }

        .ds-event-header {
            min-height: 60px;
        }

        .ds-event-cancel {
            position: absolute;
            left: -60px;
        }

        .v-input {
            margin-bottom: 8px;
            .v-input__slot {
              min-height: 40px;
            }
        }
    }

</style>
