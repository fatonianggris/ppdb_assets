/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  var __webpack_exports__ = {};
  /*!*****************************************************************!*\
	 !*** ../demo1/src/js/pages/crud/ktdatatable/base/html-table.js ***!
	 \*****************************************************************/

  // Class definition

  var KTDatatableHtmlTableDemo = (function () {
    // Private functions

    var demo = function () {
      var datatable = $("#kt_datatable_voucher").KTDatatable({
        sortable: false,
        data: {
          saveState: { cookie: false },
          pageSize: 5,
        },
        search: {
          input: $("#kt_datatable_search_query"),
          key: "generalSearch",
        },
        layout: {
          class: "datatable-bordered datatable-head-custom",
        },
        columns: [
          {
            field: "Kode Voucher",
            title: "Kode Voucher",
            width: 120,
            textAlign: "center",
          },
          {
            field: "Jenis",
            title: "Jenis",
            width: 150,
            template: function (row) {
              var status = {
                1: {
                  title: "PENDAFTARAN (FORMULIR)",
                  class: "label-light-warning",
                },
                2: {
                  title: "UANG MASUK (PPDB)",
                  class: "label-light-primary",
                },
              };
              return (
                '<span class="label font-weight-bold label-lg ' +
                status[row.Jenis].class +
                ' label-inline">' +
                status[row.Jenis].title +
                "</span>"
              );
            },
          },
          {
            field: "Nama Voucher",
            title: "Nama Voucher",
            width: 230,
            autoHide: false,
          },
          {
            field: "Potongan",
            title: "Potongan",
            width: 80,
            template: function (row) {
              return (
                '<span class="label font-weight-bold label-lg label-light-default label-inline"><b class="text-danger">' +
                row.Potongan +
                "%</b></span>"
              );
            },
          },
          {
            field: "Jumlah Voucher",
            title: "Jumlah Voucher",
            width: 80,
          },
          {
            field: "Voucher Terpakai",
            title: "Voucher Terpakai",
            width: 80,
            textAlign: "center",
          },
          {
            field: "Masa Berlaku",
            title: "Masa Berlaku",
            width: 100,
            textAlign: "center",
          },
          {
            field: "Status Aktif",
            title: "Status Aktif",
            width: 100,
            textAlign: "center",
          },
        ],
      });

      datatable.on("datatable-on-layout-updated", function () {
        var voucher_switch = $('[data-switch="true"]').bootstrapSwitch();
        voucher_switch.on(
          "switchChange.bootstrapSwitch",
          function (event, state) {
            var currentSwitch = $(this);
            var id_voucher = currentSwitch.data("id_voucher");
            var id_nama_biaya = currentSwitch.data("id_nama_biaya");
            var kode_voucher = currentSwitch.data("kode_voucher");

            if (state == true) {
              Swal.fire({
                title: "Peringatan!",
                html:
                  "Apakah anda yakin ingin <b>MENGAKTIFKAN</b> Voucher <b>'" +
                  kode_voucher +
                  "'</b> Sekarang?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1BC5BD",
                confirmButtonText: "Ya, AKTIFKAN!",
                cancelButtonText: "Tidak, BATAL!",
                closeOnConfirm: false,
                closeOnCancel: false,
              }).then(function (result) {
                if (result.value) {
                  $.ajax({
                    type: "post",
                    url: HOST_URL + "/ppdb/settings/voucher/change_voucher",
                    data: {
                      id: id_voucher,
                      id_nama_biaya: id_nama_biaya,
                      kode_voucher: kode_voucher,
                      value: "1",
                    },
                    dataType: "html",
                    success: function (result) {
                      $(".txt_csrfname").val(result.token);

                      Swal.fire(
                        "Berhasil!",
                        "Voucher <b>'" +
                          kode_voucher +
                          "'</b> telah diaktifkan!.",
                        "success"
                      );
                      setTimeout(function () {
                        location.reload();
                      }, 1000);
                    },
                    error: function (result) {
                      console.log(result);
                      Swal.fire(
                        "Opsss!",
                        "Koneksi Internet Bermasalah.",
                        "error"
                      );
                    },
                  });
                } else {
                  currentSwitch.bootstrapSwitch("state", false);
                  Swal.fire(
                    "Dibatalkan!",
                    "Voucher <b>'" +
                      kode_voucher +
                      "'</b> telah batal diaktifkan!.",
                    "error"
                  );
                }
              });
            } else {
              Swal.fire({
                title: "Peringatan!",
                html:
                  "Apakah anda yakin ingin <b>MENGNONAKTIFKAN</b> Voucher <b>'" +
                  kode_voucher +
                  "'</b> Sekarang?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ya, NON AKTIFKAN!",
                cancelButtonText: "Tidak, BATAL!",
                closeOnConfirm: false,
                closeOnCancel: false,
              }).then(function (result) {
                if (result.value) {
                  $.ajax({
                    type: "post",
                    url: HOST_URL + "/ppdb/settings/voucher/change_voucher",
                    data: {
                      id: id_voucher,
                      id_nama_biaya: id_nama_biaya,
                      kode_voucher: kode_voucher,
                      value: "0",
                    },
                    dataType: "html",
                    success: function (result) {
                      $(".txt_csrfname").val(result.token);

                      Swal.fire(
                        "Berhasil!",
                        "Voucher <b>'" +
                          kode_voucher +
                          "'</b> telah diaktifkan!.",
                        "success"
                      );
                      setTimeout(function () {
                        location.reload();
                      }, 1000);
                    },
                    error: function (result) {
                      console.log(result);
                      Swal.fire(
                        "Opsss!",
                        "Koneksi Internet Bermasalah.",
                        "error"
                      );
                    },
                  });
                } else {
                  currentSwitch.bootstrapSwitch("state", true);
                  Swal.fire(
                    "Dibatalkan!",
                    "Voucher <b>'" +
                      kode_voucher +
                      "'</b> telah batal dinonaktifkan!.",
                    "error"
                  );
                }
              });
            }
          }
        );
      });

      $("#kt_datatable_search_voucher").on("change", function () {
        datatable.search($(this).val().toLowerCase(), "Jenis");
      });

      $("#kt_datatable_search_voucher").selectpicker();
    };

    return {
      // Public functions
      init: function () {
        // init dmeo
        demo();
      },
    };
  })();

  jQuery(document).ready(function () {
    KTDatatableHtmlTableDemo.init();
  });

  /******/
})();
//# sourceMappingURL=html-table.js.map
