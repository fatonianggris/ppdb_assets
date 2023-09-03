/******/ (() => { // webpackBootstrap
    /******/ 	"use strict";
	var __webpack_exports__ = {};
	/*!*******************************************************!*\
	 !*** ../demo1/src/js/pages/custom/wizard/wizard-2.js ***!
	 \*******************************************************/


	// Class definition
	var KTWizard2 = function () {
		// Base elements
		var _wizardEl;
		var _formEl;
		var _wizardObj;
		var _validations = [];

		// Private functions
		var _initWizard = function () {
			// Initialize form wizard
			_wizardObj = new KTWizard(_wizardEl, {
				startStep: 1, // initial active step number
				clickableSteps: false // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
			});

			// Validation before going to next page
			_wizardObj.on('change', function (wizard) {
				if (wizard.getStep() > wizard.getNewStep()) {
					return; // Skip if stepped back
				}

				// Validate form before change wizard step
				var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

				if (validator) {
					validator.validate().then(function (status) {
						if (status == 'Valid') {
							wizard.goTo(wizard.getNewStep());
							KTUtil.scrollTop();
						} else {
							Swal.fire({
								text: "Mohon Maaf, kemungkinan terjadi kesalahan pada pengisian Anda, Mohon menginputkan dengan benar.",
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Oke!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-primary"
								}
							}).then(function () {
								KTUtil.scrollTop();
							});
						}
					});
				}

				return false;  // Do not change wizard step, further action will be handled by he validator
			});

			// Change event
			_wizardObj.on('changed', function (wizard) {
				KTUtil.scrollTop();
			});

			// Submit event
			_wizardObj.on('submit', function (wizard) {
				// Validate form before submit
				var validator = _validations[wizard.getStep() - 1]; // get validator for currnt step

				if (validator) {
					validator.validate().then(function (status) {
						if (status == 'Valid') {
							Swal.fire({
								text: "Oke! semua inputan telah tervalidasi, Silahkan pilih tombol Kirim untuk menyimpan.",
								icon: "success",
								showCancelButton: true,
								buttonsStyling: false,
								confirmButtonText: "Ya, kirim!",
								cancelButtonText: "Tidak, batalkan",
								customClass: {
									confirmButton: "btn font-weight-bold btn-primary",
									cancelButton: "btn font-weight-bold btn-danger"
								}
							}).then(function (result) {
								if (result.value) {
									KTApp.blockPage({
										overlayColor: '#FFA800',
										state: 'warning',
										size: 'lg',
										opacity: 0.1,
										message: 'Silahkan Tunggu...'
									});
									_formEl.submit(); // Submit form
								} else if (result.dismiss === 'cancel') {
									Swal.fire({
										text: "Input tambah siswa Anda batalkan!.",
										icon: "error",
										buttonsStyling: false,
										confirmButtonText: "Oke!",
										customClass: {
											confirmButton: "btn font-weight-bold btn-primary",
										}
									});
								}
							});
						} else {
							Swal.fire({
								text: "Mohon Maaf, kemungkinan terjadi kesalahan pada pengisian Anda, Mohon menginputkan dengan benar.",
								icon: "error",
								buttonsStyling: false,
								confirmButtonText: "Oke!",
								customClass: {
									confirmButton: "btn font-weight-bold btn-primary"
								}
							}).then(function () {
								KTUtil.scrollTop();
							});
						}
					});
				}
			});
		};

		var _initValidation = function () {
			// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
			// Step 1
			_validations.push(FormValidation.formValidation(
				_formEl,
				{
					fields: {
						foto_siswa: {
							validators: {
								notEmpty: {
									message: 'Pas Foto Siswa 3x4 Diperlukan'
								},
								file: {
									extension: 'jpeg,jpg,png',
									type: 'image/jpeg,image/png',
									maxSize: 3097152,
									message: 'Foto harus berekstensi jpeg,jpg,png 3x4 dan < 3Mb'
								}
							}
						},
						kartu_keluarga: {
							validators: {
								notEmpty: {
									message: 'Foto Kartu Keluarga Diperlukan'
								},
								file: {
									extension: 'jpeg,jpg,png',
									type: 'image/jpeg,image/png',
									maxSize: 3097152,
									message: 'Foto KK harus berekstensi jpeg,jpg,png dan < 3Mb'
								}
							}
						},
						akta_kelahiran: {
							validators: {
								notEmpty: {
									message: 'Foto Akta Kelahiran Diperlukan'
								},
								file: {
									extension: 'jpeg,jpg,png',
									type: 'image/jpeg,image/png',
									maxSize: 3097152,
									message: 'Foto Akta Kelahiran harus berekstensi jpeg,jpg,png dan < 3Mb'
								}
							}
						},
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap({
							//eleInvalidClass: '',
							eleValidClass: '',
						})
					}
				}
			));

			// Step 2
			_validations.push(FormValidation.formValidation(
				_formEl,
				{
					fields: {
						persetujuan_1: {
							validators: {
								notEmpty: {
									message: 'Diperlukan'
								}
							}
						},
						persetujuan_2: {
							validators: {
								notEmpty: {
									message: 'Diperlukan'
								}
							}
						},
					},
					plugins: {
						trigger: new FormValidation.plugins.Trigger(),
						// Bootstrap Framework Integration
						bootstrap: new FormValidation.plugins.Bootstrap({
							//eleInvalidClass: '',
							eleValidClass: '',
						})
					}
				}
			));

		};

		return {
			// public functions
			init: function () {
				_wizardEl = KTUtil.getById('kt_wizard');
				_formEl = KTUtil.getById('kt_form_student');

				_initWizard();
				_initValidation();
			}
		};
	}();

	jQuery(document).ready(function () {
		KTWizard2.init();
	});

	/******/
})()
	;
//# sourceMappingURL=wizard-2.js.map
