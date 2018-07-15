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
       @click="edit">
       <v-icon>{{ icons.edit }}</v-icon>
     </v-btn>

     <slot name="eventCreatePopoverToolbarLeft" v-bind="slotData"></slot>

     <v-spacer></v-spacer>

     <slot name="eventCreatePopoverToolbarRight" v-bind="slotData"></slot>

     <slot name="eventCreatePopoverToolbarSave" v-bind="slotData">

       <v-btn flat dark :disabled="!isValid" @click="save">
         <v-icon left>{{ icons.save }}</v-icon>
         <span>{{ labels.save }}</span>
       </v-btn>

     </slot>

     <slot name="eventCreatePopoverToolbarClose" v-bind="slotData">

       <v-tooltip bottom>
         <v-btn icon slot="activator" @click="close" :style="styleButton">
           <v-icon>{{ icons.close }}</v-icon>
         </v-btn>
         <span>{{ labels.close }}</span>
       </v-tooltip>

     </slot>

   </v-toolbar>
   <v-card-text>

     <slot name="eventCreatePopoverBodyTop" v-bind="slotData"></slot>

     <v-list>

       <v-list-tile>
         <v-list-tile-avatar>
           <v-icon>access_time</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverOccurs" v-bind="slotData">
             <v-list-tile-title>{{ startDate }}</v-list-tile-title>
             <v-list-tile-sub-title>{{ occurs }}</v-list-tile-sub-title>
           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="prompts.location && $dayspan.supports.location">
         <v-list-tile-avatar>
           <v-icon>location_on</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverLocation" v-bind="slotData">

             <v-text-field
               single-line hide-details solo flat full-width
               :label="labels.location"
               v-model="details.location"
             ></v-text-field>

           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="prompts.description && $dayspan.supports.description">
         <v-list-tile-avatar>
           <v-icon>subject</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverDescription" v-bind="slotData">

             <v-textarea
               hide-details single-line solo flat full-width
               :label="labels.description"
               v-model="details.description"
             ></v-textarea>

           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="prompts.calendar && $dayspan.supports.calendar">
         <v-list-tile-avatar>
           <v-icon>event</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverCalendar" v-bind="slotData">

            <v-text-field
              single-line hide-details solo flat full-width
              :label="labels.calendar"
              v-model="details.calendar"
            ></v-text-field>

           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="prompts.color && $dayspan.supports.color">
         <v-list-tile-avatar>
           <v-icon>invert_colors</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverColor" v-bind="slotData">

            <v-select
              single-line hide-details solo flat full-width
              :items="$dayspan.colors"
              :color="details.color"
              v-model="details.color">
              <template slot="item" slot-scope="{ item }">
                <v-list-tile-content>
                  <div class="ds-color-option" :style="{backgroundColor: item.value}" v-text="item.text"></div>
                </v-list-tile-content>
              </template>
            </v-select>

           </slot>
         </v-list-tile-content>
       </v-list-tile>

       <v-list-tile v-if="prompts.busy && $dayspan.supports.busy">
         <v-list-tile-avatar>
           <v-icon>work</v-icon>
         </v-list-tile-avatar>
         <v-list-tile-content>
           <slot name="eventCreatePopoverBusy" v-bind="slotData">

             <v-select
              single-line hide-details solo flat full-width
              :items="busyOptions"
              v-model="details.busy"
            ></v-select>

           </slot>
         </v-list-tile-content>
       </v-list-tile>

     </v-list>

     <slot name="eventCreatePopoverBodyBottom" v-bind="slotData"></slot>

   </v-card-text>

   <slot name="eventCreatePopoverActions" v-bind="slotData"></slot>

  </v-card>

</template>

<script>
import { CalendarEvent, Calendar, Pattern, Functions as fn } from 'dayspan';


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
      validate(x) {
        return this.$dsValidate(x, 'formats');
      },
      default() {
        return this.$dsDefaults().formats;
      }
    },

    icons:
    {
      validate(x) {
        return this.$dsValidate(x, 'icons');
      },
      default() {
        return this.$dsDefaults().icons;
      }
    },

    labels:
    {
      validate(x) {
        return this.$dsValidate(x, 'labels');
      },
      default() {
        return this.$dsDefaults().labels;
      }
    },

    prompts:
    {
      validate(x) {
        return this.$dsValidate(x, 'prompts');
      },
      default() {
        return this.$dsDefaults().prompts;
      }
    },

    busyOptions:
    {
      type: Array,
      default() {
        return this.$dsDefaults().busyOptions;
      }
    }
  },

  computed:
  {
    slotData()
    {
      return {
        calendarEvent: this.calendarEvent,
        calendar: this.calendar,
        close: this.close,
        details: this.details
      };
    },

    classes()
    {
      return {
        'ds-event-cancelled': this.calendarEvent.cancelled
      };
    },

    styleHeader()
    {
      return {
        backgroundColor: this.details.color,
        color: this.details.forecolor
      };
    },

    styleButton()
    {
      return {
        color: this.details.forecolor
      };
    },

    startDate()
    {
      return this.calendarEvent.start.format( this.formats.start );
    },

    busyness()
    {
      return this.details.busy ? this.labels.busy : this.labels.free;
    },

    isValid()
    {
      return this.$dayspan.isValidEvent(
        this.details,
        this.calendarEvent.schedule,
        this.calendarEvent
      );
    },

    duration()
    {
      let schedule = this.calendarEvent.schedule;
      let units = this.labels[ schedule.durationUnit ];
      let length = schedule.duration;
      let chosenUnit = length === 1 ? units[ 0 ] : units[ 1 ];
      let duration = length + ' ' + chosenUnit;

      return duration;
    },

    occurs()
    {
      let calendarEvent = this.calendarEvent;
      let schedule = calendarEvent.schedule;

      if (schedule.isSingleEvent())
      {
        if (schedule.isFullDay())
        {
          return this.duration;
        }
        else
        {
          return calendarEvent.start.asTime().format( this.formats.time );
        }
      }

      let pattern = Pattern.findMatch( schedule );

      if (pattern && pattern.name !== 'custom')
      {
        let description = pattern.describe( calendarEvent.start );

        if (!schedule.isFullDay())
        {
          description += ' at ' + schedule.describeArray( schedule.times, x => x.format( this.formats.time ) );
        }

        description += ' (' + this.duration + ')';

        return description;
      }

      let described = schedule.describe('event', false);

      return described.substring( 20 ) + ' (' + this.duration + ')';
    }
  },

  data: vm => ({
    details: vm.buildDetails()
  }),

  methods:
  {
    edit()
    {
      this.$emit('edit', this.calendarEvent);

      this.close();
    },

    save()
    {
      let ev = this.getEvent('creating');

      this.$emit('creating', ev);

      if (!ev.handled && ev.details && ev.calendarEvent)
      {
        ev.created = ev.calendarEvent.event;

        this.$dayspan.setEventDetails(
          ev.details,
          ev.created.data,
          ev.created,
          ev.calendarEvent
        );

        if (ev.calendar)
        {
          ev.calendar.addEvent( ev.created );
          ev.added = true;
        }

        this.$emit('created', ev);

        if (ev.calendar && ev.refresh)
        {
          ev.calendar.refreshEvents();
        }

        ev.handled = true;
      }

      if (ev.close)
      {
        this.close();

        this.$emit('create-popover-closed', ev);
      }
    },

    buildDetails()
    {
      let details = this.$dayspan.getEventDetails(
        this.calendarEvent.event.data,
        this.calendarEvent.event,
        this.calendarEvent
      );

      details.title = '';

      return details;
    },

    getEvent(type, extra = {})
    {
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

      }, extra);
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

.v-toolbar__extension {

  .v-toolbar__title {
    width: 100%;
    margin-left: 48px;
    margin-right: -8px;

    /deep/ .v-input__slot {
      background-color: rgba(255,255,255,0.2) !important;

      input {
        caret-color: rgba(0,0,0,.87) !important;
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

    /deep/ .v-list__tile {
      height: auto !important;
    }
  }
}

.ds-color-option {
  width: 100%;
  color: white;
  padding: 4px;
}

</style>