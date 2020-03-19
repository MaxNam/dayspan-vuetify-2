<template>

    <v-card class="ds-calendar-event-popover-card"
            :class="classes">

        <v-toolbar extended flat
                   :style="styleHeader">

            <v-toolbar-title slot="extension">

                <v-text-field single-line hide-details solo flat autofocus
                              :label="labels.title"
                              v-model="details.title"
                ></v-text-field>

            </v-toolbar-title>

            <v-btn
                    v-if="!details.readonly"
                    color="secondary"
                    small absolute bottom left fab icon
                    @click="edit"
                    class="v-btn-edit"
            >
                <v-icon>{{ icons.edit }}</v-icon>
            </v-btn>

            <slot name="eventCreatePopoverToolbarLeft" v-bind="slotData"></slot>

            <v-spacer></v-spacer>

            <slot name="eventCreatePopoverToolbarRight" v-bind="slotData"></slot>

            <slot name="eventCreatePopoverToolbarSave" v-bind="slotData">

                <v-btn
                        class="ds-create-popover-save"
                        text
                        :disabled="!isValid"
                        :style="styleText"
                        @click="save">

                    <v-icon left>{{ icons.save }}</v-icon>
                    <span>{{ labels.save }}</span>

                </v-btn>

            </slot>

            <slot name="eventCreatePopoverToolbarClose" v-bind="slotData">

                <v-btn icon
                       @click="close"
                       :style="styleText" style="background-color: transparent!important;">

                    <v-icon>{{ icons.close }}</v-icon>

                </v-btn>

            </slot>

        </v-toolbar>
        <v-card-text>

            <slot name="eventCreatePopoverBodyTop" v-bind="slotData"></slot>

            <v-list>

                <v-list-item>
                    <v-list-item-avatar>
                        <v-icon>access_time</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverOccurs" v-bind="slotData">
                            <v-list-item-title>
                                {{ startDate }} 
                                <template v-if="startDate !== endDate"> 
                                    > {{ endDate }}
                                </template>
                            </v-list-item-title>
                            <v-list-item-subtitle>{{ occurs }}</v-list-item-subtitle>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.guests && $dayspan.supports.guests">
                    <v-list-item-avatar>
                        <v-icon>people</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverGuests" v-bind="slotData">

                            <v-text-field
                                single-line hide-details filled
                                :label="labels.guests"
                                v-model="details.guests"
                                class="ds-input"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.location && $dayspan.supports.location">
                    <v-list-item-avatar>
                        <v-icon>location_on</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverLocation" v-bind="slotData">

                            <v-text-field
                                    single-line hide-details filled
                                    :label="labels.location"
                                    v-model="details.location"
                                    class="ds-input"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.phone && $dayspan.supports.phone">
                    <v-list-item-avatar>
                        <v-icon>phone</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverPhone" v-bind="slotData">

                            <v-text-field
                                single-line hide-details filled
                                :label="labels.phone"
                                v-model="details.phone"
                                v-mask="'###-####-####'"
                                class="ds-input"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.description && $dayspan.supports.description">
                    <v-list-item-avatar>
                        <v-icon>subject</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverDescription" v-bind="slotData">

                            <v-textarea
                                single-line hide-details filled
                                :label="labels.description"
                                v-model="details.description"
                                class="ds-input"
                            ></v-textarea>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.calendar && $dayspan.supports.calendar">
                    <v-list-item-avatar>
                        <v-icon>event</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverCalendar" v-bind="slotData">

                            <v-text-field
                                single-line hide-details filled
                                :label="labels.calendar"
                                v-model="details.calendar"
                                class="ds-input"
                            ></v-text-field>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.color && $dayspan.supports.color">
                    <v-list-item-avatar>
                        <v-icon>invert_colors</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverColor" v-bind="slotData">

                            <v-select
                                single-line hide-details filled
                                :items="$dayspan.colors"
                                :color="details.color"
                                v-model="details.color"
                                class="ds-input"
                            >
                                <template slot="item" slot-scope="{ item }">
                                    <v-list-item-content>
                                        <div class="ds-color-option" :style="{backgroundColor: item.value}" v-text="item.text"></div>
                                    </v-list-item-content>
                                </template>
                            </v-select>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="prompts.notifyTime && $dayspan.supports.notifyTime && prompts.notifyHow && $dayspan.supports.notifyHow">
                    <v-list-item-avatar>
                        <v-icon>alarm</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverBusy" v-bind="slotData">
                            <v-row>
                                <v-col cols="4">
                                    <v-select
                                        single-line hide-details filled
                                        :items="notifyTimeOptions"
                                        v-model="details.notifyTime"
                                        class="ds-input"
                                    ></v-select>
                                </v-col>
                                <v-col cols="8">
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
                    </v-list-item-content>
                </v-list-item>
                
                <v-list-item v-if="prompts.show && $dayspan.supports.show">
                    <v-list-item-avatar>
                        <v-icon>lock</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverShow" v-bind="slotData">

                            <v-radio-group class="ds-radio-group" v-model="details.show" row>
                                <v-radio 
                                    v-for="(option, idx) in showOptions"
                                    :key="idx"
                                    color="primary"
                                    :label="option.text" 
                                    :value="option.value"
                                ></v-radio>
                            </v-radio-group>

                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <!-- <v-list-item v-if="prompts.busy && $dayspan.supports.busy">
                    <v-list-item-avatar>
                        <v-icon>work</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content class="py-0">
                        <slot name="eventCreatePopoverBusy" v-bind="slotData">

                            <v-select
                                single-line hide-details filled
                                :items="busyOptions"
                                v-model="details.busy"
                                class="ds-input"
                            ></v-select>

                        </slot>
                    </v-list-item-content>
                </v-list-item> -->

            </v-list>

            <slot name="eventCreatePopoverBodyBottom" v-bind="slotData"></slot>

        </v-card-text>

        <slot name="eventCreatePopoverActions" v-bind="slotData"></slot>

    </v-card>

</template>

<script>
import { CalendarEvent, Calendar, Pattern, Functions as fn } from 'dayspan'
import moment from 'moment'

export default {

    name: 'dsCalendarEventCreatePopover',

    props:
        {
            calendarEvent:
                {
                    required: true,
                    type: CalendarEvent
                },

            calendar:
                {
                    required: true,
                    type: Calendar
                },

            close:
                {
                    type: Function
                },

            formats:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'formats')
                    },
                    default () {
                        return this.$dsDefaults().formats
                    }
                },

            icons:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'icons')
                    },
                    default () {
                        return this.$dsDefaults().icons
                    }
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

            prompts:
                {
                    validate (x) {
                        return this.$dsValidate(x, 'prompts')
                    },
                    default () {
                        return this.$dsDefaults().prompts
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
            // busyOptions:
            //     {
            //         type: Array,
            //         default () {
            //             return this.$dsDefaults().busyOptions
            //         }
            //     }
        },

    computed:
        {
            slotData () {
                return {
                    calendarEvent: this.calendarEvent,
                    calendar: this.calendar,
                    close: this.close,
                    details: this.details
                }
            },

            classes () {
                return {
                    'ds-event-cancelled': this.calendarEvent.cancelled
                }
            },

            styleHeader () {
                return {
                    backgroundColor: this.details.color,
                    color: this.details.forecolor
                }
            },

            styleText () {
                return {
                    color: this.details.forecolor
                }
            },

            startDate () {
                return moment(this.calendarEvent.start.time).format('M월 D일 ddd요일')
            },

            endDate () {
                return moment(this.calendarEvent.end.time).format('M월 D일 ddd요일')
            },

            busyness () {
                return this.details.busy ? this.labels.busy : this.labels.free
            },

            isValid () {
                return this.$dayspan.isValidEvent(
                    this.details,
                    this.calendarEvent.schedule,
                    this.calendarEvent
                )
            },

            occurs () {
                return this.$dayspan.getEventOccurrence(
                    this.calendarEvent.schedule,
                    this.calendarEvent.start,
                    this.labels,
                    this.formats
                )
            }
        },

    data: vm => ({
        details: vm.buildDetails()
    }),

    methods:
        {
            edit () {
                var ev = this.getEvent('create-edit')

                this.$emit('create-edit', ev)

                this.finishEvent(ev)
            },

            save () {
                let ev = this.getEvent('creating')

                this.$emit('creating', ev)

                if (!ev.handled && ev.details && ev.calendarEvent) {
                    ev.created = ev.calendarEvent.event

                    this.$dayspan.setEventDetails(
                        ev.details,
                        ev.created.data,
                        ev.created,
                        ev.calendarEvent
                    )

                    if (ev.calendar) {
                        ev.calendar.addEvent(ev.created)
                        ev.added = true
                    }

                    this.$emit('created', ev)

                    if (ev.calendar && ev.refresh) {
                        ev.calendar.refreshEvents()
                    }

                    ev.handled = true

                    this.$emit('event-create', ev.created)
                }

                this.finishEvent(ev)
            },

            finishEvent (ev) {
                if (ev.close) {
                    this.close()

                    this.$emit('create-popover-closed', ev)
                }
            },

            buildDetails () {
                let details = this.$dayspan.copyEventDetails(this.calendarEvent.event.data)

                details.title = ''

                return details
            },

            getEvent (type, extra = {}) {
                return fn.extend({

                    type: type,
                    calendarEvent: this.calendarEvent,
                    calendar: this.calendar,
                    close: this.close,
                    details: this.details,
                    handled: false,
                    added: false,
                    refresh: true,
                    close: true,
                    $vm: this,
                    $element: this.$el

                }, extra)
            }
        }
}
</script>

<style scoped lang="scss">

    .v-btn--floating.v-btn--left {
        margin-left: 0px !important;

        .v-icon {
            height: auto;
        }
    }

    .v-btn-edit {
        margin-left: 0!important;
        background-color: #424242!important; 
        i {
            color: #fff!important;
        }
    }

    .ds-calendar-event-popover-card {

        .v-toolbar__extension {
            padding: 0 16px !important;
            height: 60px !important;
            align-items: start;

            .v-toolbar__title {
                width: 100%;
                margin-left: 56px;
                margin-right: 0px;

                .v-input__slot {
                    background-color: rgba(255, 255, 255, 0.2) !important;

                    input {
                        caret-color: rgba(0, 0, 0, .87) !important;
                    }
                }
            }
        }
    }

    .v-text-field--full-width {
        width: 100%;
    }

    .v-card__text {
        padding: 16px 0;

        .v-list {
            padding-bottom: 0px;

            > div:first-child {
                margin-bottom: 1em;
            }

            .v-list__tile {
                height: auto !important;
            }
        }
    }

    .ds-create-popover-save {
        background-color: transparent !important;
    }

    .ds-color-option {
        width: 100%;
        color: white;
        padding: 4px;
    }

    .v-input {
        margin-bottom: 8px !important;
    }

</style>
